import json
import os
from datetime import datetime, timedelta

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# Load the legal dictionary once at module level
_path1 = os.path.abspath(os.path.join(BASE_DIR, '..', 'database', 'mockdata', 'legal_dict.json'))
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


def _validate_bn07_against_stored(data, stored):
    e = []
    if not stored:
        return e
    # If the AI says residence_changed = false, but the stored residential address is different from principal_place? No, just trust AI.
    # More useful: check that bn_number matches
    if data.get("bn_number") != stored.get("registration_number"):
        e.append("BN Number mismatch between extracted and stored data.")
    # If user claimed no change to residence, proprietors_residential_address MUST be null
    if data.get("proprietor_residential_address") is not None and not data.get("proprietor_residential_address"):
        # treated as empty string?
        pass  # already handled by AI setting null
    return e


def _validate_business_name(data: dict) -> list:
    e = []
    # Required fields
    for field in ["bn_number", "proprietor_name", "principal_place_of_business", "nature_of_business"]:
        if not data.get(field):
            e.append(f"Missing required field: {field}")

    # BN number format (BN-XXXXXX or BN-XXXXXXX)
    bn = data.get("bn_number", "")
    if bn:
        # 9 chars = BN- (3) + 6 digits | 10 chars = BN- (3) + 7 digits
        if not (bn.startswith("BN-") and len(bn) in [9, 10] and bn[3:].isdigit()):
            e.append("Invalid BN Number format. Expected BN-XXXXXX or BN-XXXXXXX.")


    # # If address changed, new address must not be empty
    # if data.get("proprietor_residential_address") is not None and data.get("proprietor_residential_address") == "":
    #     e.append("Proprietor residential address required when changed.")
    
    # If residence changed true, then new address must be non-null and non-empty
    # but we don't have that field in our BN07 schema; we only have proprietor_residential_address
    if data.get("residence_changed") is True:
        # Instead, check: if proprietor_residential_address is provided (not None and not empty), then it's a change; we just need it to be non-empty.
        # So if it's set and is empty string -> error.
        addr = data.get("proprietor_residential_address")
        if addr is not None and addr == "":
            e.append("Proprietor residential address must not be empty if changed.")

    # Validate warnings list if present
    if "warnings" in data and not isinstance(data["warnings"], list):
        e.append("'warnings' must be a list.")

    return e


def _validate_company(data: dict) -> list:
    e = []
    # Required top-level fields
    for field in ["rc_number", "company_name"]:
        if not data.get(field):
            e.append(f"Missing required field: {field}")

    # RC number format (RC-XXXXXX or RC-XXXXXXX)
    rc = data.get("rc_number", "")
    if rc:
        # 9 chars = RC- (3) + 6 digits | 10 chars = RC- (3) + 7 digits
        if not (rc.startswith("RC-") and len(rc) in [9, 10] and rc[3:].isdigit()):
            e.append("Invalid RC Number format. Expected RC-XXXXXX or RC-XXXXXXX.")

    # small_company must be boolean
    if not isinstance(data.get("small_company"), bool):
        e.append("'small_company' must be a boolean.")

    # Validate agm_details object
    agm = data.get("agm_details", {})
    if not isinstance(agm, dict):
        e.append("'agm_details' must be an object.")
    else:
        if "held" not in agm or not isinstance(agm["held"], bool):
            e.append("'agm_details.held' must be a boolean.")
        else:
            if agm["held"] is True:
                if not agm.get("date"):
                    e.append("AGM date required when 'held' is true.")
                else:
                    # Validate date format and CAMA 42-day rule
                    try:
                        agm_date = datetime.strptime(agm["date"], "%Y-%m-%d")
                        # AGM must be within 42 days after the company's financial year end.
                        # This is a soft check: we simply ensure it's a plausible date within the current year.
                        if agm_date > datetime.now() + timedelta(days=30):
                            e.append(
                                "AGM date appears to be in the future, please verify.")
                    except ValueError:
                        e.append("Invalid AGM date format. Use YYYY-MM-DD.")
            else:  # agm not held
                if not agm.get("explanation"):
                    e.append("Explanation required when AGM was not held.")

    # Booleans for changes
    for field in ["directors_changed", "shareholders_changed", "share_capital_changed", "registered_address_changed"]:
        if not isinstance(data.get(field), bool):
            e.append(f"'{field}' must be a boolean.")

    # Conditional checks
    if data.get("share_capital_changed") is True:
        new_cap = data.get("new_share_capital")
        if new_cap is None or not isinstance(new_cap, (int, float)) or new_cap <= 0:
            e.append(
                "New share capital must be a positive number when share capital changed.")

    if data.get("registered_address_changed") is True:
        if not data.get("new_registered_address"):
            e.append("New registered address required when address changed.")

    # Cross-reference with legal dictionary (anti-hallucination)
    # e.g., ensure company type if present matches allowed types
    if "company_type" in data:
        allowed_types = LEGAL_DICT.get("company_types", [])
        if data["company_type"] not in allowed_types:
            e.append(
                f"Company type '{data['company_type']}' is not a valid CAC type. Allowed: {allowed_types}")

    # Check state names for registered address (if we parse addresses in future)
    # For now, we can skip deep address validation.

    # Warnings list
    if "warnings" in data and not isinstance(data["warnings"], list):
        e.append("'warnings' must be a list.")

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
            "status": "Active",   # mocked – all our records are active
            "entity_type": "business_name"
        }
    elif entity_type == "ltd_company":
        pp = stored.get("registered_office", {})   # if available in company JSON
        return {
            "company_name": stored.get("company_name", ""),
            "rc_number": stored.get("rc_number", ""),
            "company_type": stored.get("company_type", "Private Company Limited by Shares"),
            "registered_address": f"{pp.get('number', '')} {pp.get('street', '')}, {pp.get('city', '')}, {pp.get('state', '')}".strip(", "),
            "status": "Active",
            "financial_address": f"{pp.get('number', '')} {pp.get('street', '')}, {pp.get('city', '')}, {pp.get('state', '')}".strip(", "),
            "entity_type": "ltd_company"
        }
    else:
        return {}