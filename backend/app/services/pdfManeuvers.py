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
#     data = {field: field for field in fields}

#     for page in writer.pages:
#         # Update form field values (if fields are on the first page)
#         # If they're spread across pages, you'll need to handle page by page,
#         # but for this PDF most fields seem to be on page 1.
#         try:
#             writer.update_page_form_field_values(page, data)
#         except Exception as e:
#             # Fallback: direct annotation update
#             for annot in page.annotations:
#                 field_name = annot.get('/T')
#                 if field_name and field_name in data:
#                     annot.update({'/V': data[field_name]})

#         with open(output_path, "wb") as f:
#             writer.write(f)


# # Run
# _Bpath = os.path.join(BASE_DIR, '..', 'cacdata', 'business_name.pdf')
# _Cpath = os.path.join(BASE_DIR, '..', 'cacdata', 'ltd_company.pdf')


# # show_field_locations(_Bpath, "new_business_form.pdf")
# show_field_locations(_Cpath, "new_company_form.pdf")


from app.services.pdfService import _build_bn07_data_from_stored, universal_fill_pdf
from app.cacdata.mappings.mappings import BN07_FIELD_MAP
import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
REG_DIR = os.path.join(BASE_DIR, '..', 'database', 'mockdata', 'registry')
CAC_DIR = os.path.join(BASE_DIR, '..', 'cacdata')

def run_pdf():
    # Load sample stored data
    with open(os.path.join(BASE_DIR, '..', 'database', 'mockdata', 'registry', 'business_names.json')) as f:
        mock = json.load(f)["BN-2345678"]

    # Simulate extracted (no changes)
    extracted = {
        "bn_number": "BN-2345678",
        "proprietor_name": "Okonkwo Joyce",
        "principal_place_of_business": None,
        "nature_of_business": "General Trading and Logistics",
        "proprietor_residential_address": None,
        "warnings": []
    }

    # Build data and fill
    data = _build_bn07_data_from_stored(mock, extracted)
    field_values = {}
    for key, field_name in BN07_FIELD_MAP.items():
        val = data.get(key, "")
        if field_name:   # skip empty mappings like signatures
            field_values[field_name] = str(val) if val else ""

    pdf_buf = universal_fill_pdf(os.path.join(BASE_DIR, '..', 'cacdata', 'business_name.pdf'), field_values)
    with open("test_filled_bn.pdf", "wb") as out:
        out.write(pdf_buf.read())
    print("✅ Done. Open test_filled_bn.pdf")
