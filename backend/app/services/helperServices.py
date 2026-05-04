from datetime import datetime, timedelta
from pypdf import PdfReader, PdfWriter
import json
import os
import io

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# Load the legal dictionary once at module level
_path1 = os.path.abspath(os.path.join(
    BASE_DIR, '..', 'database', 'mockdata', 'legal_dict.json'))
with open(_path1, "r") as f:
    LEGAL_DICT = json.load(f)


def validate_output(data: dict, entity_type: str) -> tuple:
    """
    Validates an extracted/output JSON against CAC rules.
    Returns (is_valid: bool, errors: list[str])
    """
    errors = []

    if entity_type == "business_name":
        errors.extend(_validate_business_name(data))
    elif entity_type == "ltd_company":
        errors.extend(_validate_company(data))
    else:
        errors.append(f"Unknown entity_type: {entity_type}")
        return False, errors

    return len(errors) == 0, errors


def _validate_business_name(data: dict) -> list:
    e = []
    # Core requirements for the summary
    if not data.get("nature_of_business"):
        e.append("Nature of business is required.")

    # Check if address was provided when logic says it changed
    # (Checking data.get because AI might set it to empty string if confused)
    addr = data.get("proprietor_residential_address")
    if addr == "":
        e.append("New residential address cannot be empty if a change was indicated.")

    return e


def _validate_company(data: dict) -> list:
    e = []
    agm = data.get("agm_details", {})
    
    # 1. AGM Logic
    if agm.get("held"):
        if not agm.get("date"):
            e.append("AGM date is required.")
        else:
            try:
                agm_date = datetime.strptime(agm["date"], "%Y-%m-%d")
                today = datetime.now()

                # Rule: AGM cannot be in the future
                if agm_date > today:
                    e.append("AGM date cannot be in the future.")
                
                # CAMA Rule: Return must be filed within 42 days of AGM
                # If today is more than 42 days after agm_date, trigger a warning/error
                deadline = agm_date + timedelta(days=42)
                if today > deadline:
                    days_over = (today - deadline).days
                    e.append(f"Filing is {days_over} days past the statutory 42-day limit after the AGM. Late penalties may apply.")

            except ValueError:
                e.append("Invalid date format. Use YYYY-MM-DD.")
    else:
        # If AGM was not held, an explanation is mandatory
        if not agm.get("explanation") or str(agm.get("explanation")).strip() == "":
            e.append("An explanation is required if no AGM was held.")

    # 2. Capital Change Logic
    if data.get("share_capital_changed"):
        try:
            val = data.get("new_share_capital")
            # Using float conversion to handle both strings and numbers from the AI
            if not val or float(val) <= 0:
                e.append("Valid share capital amount is required if capital changed.")
        except (ValueError, TypeError):
            e.append("Share capital must be a numeric value.")

    return e


def build_company_info(stored: dict, entity_type: str) -> dict:
    """Construct frontend‑ready company info from the stored mock data."""
    if not stored:
        return {}

    if entity_type == "business_name":
        pp = stored.get("principal_place", {})
        return {
            "business_name": stored.get("business_name", ""),
            "bn_number": stored.get("registration_number", ""),
            "business_type": stored.get("general_nature", ""),
            "registered_address": f"{pp.get('number', '')} {pp.get('street', '')}, {pp.get('city', '')}, {pp.get('state', '')}".strip(", "),
            "status": "Active"   # mocked – all our records are active
        }
    elif entity_type == "ltd_company":
        # if available in company JSON
        pp = stored.get("registered_office", {})
        return {
            "company_name": stored.get("company_name", ""),
            "rc_number": stored.get("rc_number", ""),
            "company_type": stored.get("company_type", "Private Company Limited by Shares"),
            "registered_address": f"{pp.get('number', '')} {pp.get('street', '')}, {pp.get('city', '')}, {pp.get('state', '')}".strip(", "),
            "status": "Active",
            "financial_address": f"{pp.get('number', '')} {pp.get('street', '')}, {pp.get('city', '')}, {pp.get('state', '')}".strip(", ")
        }
    else:
        return {}


def split_date_into_digits(date_str):
    """Convert 'YYYY-MM-DD' to individual digit fields for the PDF."""
    if not date_str or date_str == "":
        return {}, {}, {}
    try:
        dt = datetime.strptime(date_str, '%Y-%m-%d')
        y = dt.strftime('%Y')
        m = dt.strftime('%m')
        d = dt.strftime('%d')
    except:
        # maybe just a year
        y, m, d = date_str, '', ''

    year_parts = {f"y{i+1}": y[i] for i in range(4) if i < len(y)}
    month_parts = {f"m{i+1}": m[i] for i in range(2) if i < len(m)}
    day_parts = {f"d{i+1}": d[i] for i in range(2) if i < len(d)}
    return year_parts, month_parts, day_parts


def split_address(address_str):
    """
    Splits an address string into (number, street, city).
    Example: "12 Awolowo Road, Ikoyi" -> ("12", "Awolowo Road", "Ikoyi")
    """
    if not address_str or not isinstance(address_str, str):
        return "", "", ""

    # 1. Separate the city from the rest (split at the first comma)
    parts = address_str.split(',', 1)
    street_area = parts[0].strip()
    city = parts[1].strip() if len(parts) > 1 else ""

    # 2. Separate the house number from the street name (split at the first space)
    street_parts = street_area.split(' ', 1)
    number = street_parts[0]
    street_name = street_parts[1] if len(street_parts) > 1 else ""

    return number, street_name, city


def format_date(date_str, space_count=5):
    if not date_str:
        return ""

    # 1. Reverse the segments: ['1987', '05', '14'] -> ['14', '05', '1987']
    parts = date_str.split('-')[::-1]

    # 2. Join with a single space first to get "14 05 1987"
    combined = " ".join(parts)

    # 3. Split into individual characters: ['1', '4', ' ', '0', '5', ' ', '1', '9', '8', '7']
    individual_digits = list(combined)

    # 4. Join them back using your "plenty" of spaces
    spacer = " " * space_count
    return spacer.join(individual_digits)


def format_date_for_frontend(date_str):
    if not date_str:
        return ""
    # Convert string to date object
    date_obj = datetime.strptime(date_str, "%Y-%m-%d")

    # Return a "human-friendly" format
    return date_obj.strftime("%B %d, %Y")  # Output: May 05, 2022


def universal_fill_pdf(template_path, field_values):
    reader = PdfReader(template_path)
    writer = PdfWriter()
    writer.append(reader)                    # <-- this preserves the form
    for page in writer.pages:
        writer.update_page_form_field_values(page, field_values)
    buf = io.BytesIO()
    writer.write(buf)
    buf.seek(0)
    return buf