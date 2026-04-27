# from pypdf import PdfReader
# import os
# import json

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# def business():
#     _Bpath = os.path.join(BASE_DIR, '..', 'cacdata', 'business_name.pdf')
#     Breader = PdfReader(_Bpath)
#     Bfields = Breader.get_fields()
#     # print(Bfields)  # dict of field_name -> field properties
#     return Bfields


# def company():
#     _Cpath = os.path.join(BASE_DIR, '..', 'cacdata', 'ltd_company.pdf')
#     Creader = PdfReader(_Cpath)
#     Cfields = Creader.get_fields()
#     # print(Cfields)  # dict of field_name -> field properties
#     return Cfields


# # def pdfFields():
# pdf1 = business()
# # pdf2 = company()

# # print(f"Business Name fields: {pdf1}")
# with open("random.json", 'w') as file:
#     json.dump(pdf1, file, indent=4)
# # print(f"Ltd Company fields: {pdf2}")






# from pypdf import PdfWriter, PdfReader
# import os

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# def show_field_locations(template_path, output_path):
#     reader = PdfReader(template_path)
#     writer = PdfWriter()

#     # Copy all pages
#     writer.append(reader)

#     # Build a dict that puts the field name as the text value
#     fields = reader.get_fields()
#     data = {}
#     for field_name in fields:
#         data[field_name] = field_name   # Fill each field with its own name

#     # Update form field values (if fields are on the first page)
#     # If they're spread across pages, you'll need to handle page by page,
#     # but for this PDF most fields seem to be on page 1.
#     try:
#         writer.update_page_form_field_values(writer.pages[0], data)
#     except Exception as e:
#         print(f"Error updating fields: {e}")
#         # Fallback: update all fields using the annotations list
#         for page in writer.pages:
#             writer.update_page_form_field_values(page, data)

#     with open(output_path, "wb") as out:
#         writer.write(out)


# # Run
# _Bpath = os.path.join(BASE_DIR, '..', 'cacdata', 'business_name.pdf')


# show_field_locations(_Bpath, "new_business_form.pdf")


from pypdf import PdfReader, PdfWriter
from app.cacdata.mappings.mappings import BN07_FIELD_MAP
from datetime import datetime
import io


def fill_business_name_pdf(template_path, stored_data: dict, extracted: dict) -> io.BytesIO:
    # 1. Build a complete data dictionary from stored + extracted
    data = _build_bn07_data_from_stored(stored_data, extracted)

    # 2. Map data keys to PDF field names
    field_values = {}
    for key, field_name in BN07_FIELD_MAP.items():
        val = data.get(key, "")
        field_values[field_name] = str(val) if val else ""

    # 3. Fill the PDF
    reader = PdfReader(template_path)
    writer = PdfWriter()
    writer.append(reader)

    try:
        writer.update_page_form_field_values(writer.pages[0], field_values)
    except Exception:
        # If that fails, try updating field by field via annotations
        for page in writer.pages:
            for annot in page.annotations:
                if annot.get('/T') in field_values:
                    annot.update({'/V': field_values[annot['/T']]})

    output_buffer = io.BytesIO()
    writer.write(output_buffer)
    output_buffer.seek(0)
    return output_buffer


def _build_bn07_data_from_stored(stored: dict, extracted: dict) -> dict:
    """Merge stored data with user changes from AI extraction."""
    # Start with stored
    pp = stored.get("principal_place", {})
    prop = stored.get("proprietors", [{}])[
        0] if stored.get("proprietors") else {}
    res_addr = prop.get("residential_address", {})
    serv_addr = prop.get("service_address", {})

    data = {
        "registration_number": stored.get("registration_number", ""),
        "business_name": stored.get("business_name", ""),
        "general_nature": stored.get("general_nature", ""),
        "pp_number": pp.get("number", ""),
        "pp_street": pp.get("street", ""),
        "pp_city": pp.get("city", ""),
        "pp_lga": pp.get("lga", ""),
        "pp_postal": pp.get("postal_code", ""),
        "pp_state": pp.get("state", ""),
        "branch_number": "",  # no branch info in stored data
        "branch_street": "",
        "branch_city": "",
        "branch_lga": "",
        "branch_postal": "",
        "branch_state": "",
        "year_ended": stored.get("annual_return_period", "").split(" ")[0] if stored.get("annual_return_period") else "",
        "financial_year_end": stored.get("financial_year_end", ""),
        "turnover": str(stored.get("turnover", "")),
        "total_net_assets": str(stored.get("total_net_assets", "")),
        "prop_surname": prop.get("surname", ""),
        "prop_forenames": prop.get("forenames", ""),
        "prop_nationality": prop.get("nationality", ""),
        "prop_dob": prop.get("dob", ""),
        "prop_gender": prop.get("gender", ""),
        "prop_phone": prop.get("phone", ""),
        "prop_id_number": prop.get("id_number", ""),
        "prop_id_type": prop.get("id_type", ""),
        "prop_email": prop.get("email", ""),
        "prop_occupation": prop.get("occupation", ""),
        "prop_res_number": res_addr.get("number", ""),
        "prop_res_street": res_addr.get("street", ""),
        "prop_res_city": res_addr.get("city", ""),
        "prop_res_lga": res_addr.get("lga", ""),
        "prop_res_postal": res_addr.get("postal_code", ""),
        "prop_res_state": res_addr.get("state", ""),
        "prop_service_number": serv_addr.get("number", ""),
        "prop_service_street": serv_addr.get("street", ""),
        "prop_service_city": serv_addr.get("city", ""),
        "prop_service_lga": serv_addr.get("lga", ""),
        "prop_service_postal": serv_addr.get("postal_code", ""),
        "prop_service_state": serv_addr.get("state", ""),
        "prop_signature": "",   # left blank
        "prop_date": datetime.today().strftime("%d/%m/%Y"),
        # ... corporate partner fields would be empty
    }

    # Apply changes from extracted JSON
    # The AI extraction for business_name gave bn_number, proprietor_name, principal_place_of_business, nature_of_business, proprietor_residential_address, warnings
    # proprietor_name might be the full name, but we already have it; ignore unless changed.
    if extracted.get("principal_place_of_business"):
        # If the user gave a new address string, we split it into components? That’s fragile.
        # Better: The AI should return structured address components; but it’s too late for that.
        # Alternative: If principal_place is changed, we replace the entire principal place address block with the user’s string.
        # For simplicity, overwrite pp_street with the whole string, and clear others.
        # put the full address in street field
        data["pp_street"] = extracted["principal_place_of_business"]
        data["pp_number"] = ""
        data["pp_city"] = ""
        data["pp_lga"] = ""
        data["pp_postal"] = ""
        data["pp_state"] = ""
    if extracted.get("proprietor_residential_address"):
        # again, full string
        data["prop_res_street"] = extracted["proprietor_residential_address"]
        # clear other fields
        data["prop_res_number"] = ""
        data["prop_res_city"] = ""
        data["prop_res_lga"] = ""
        data["prop_res_postal"] = ""
        data["prop_res_state"] = ""
    # etc.

    return data
