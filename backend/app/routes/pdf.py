from flask import Blueprint, request, jsonify
from app.wrappers.user_required import user_required
from app.database.mockdata.helpers import loadRegistryJSON
from app.services.pdfService import fill_business_name_pdf, fill_ltd_company_pdf
from app.database.functions.pdf import next_filling_deadline
import os
import base64

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

pdf_bp = Blueprint("pdf_bp", __name__, url_prefix="/api/v1")


@pdf_bp.route("/generate-pdf", methods=['POST'])
@user_required
def generate_pdf(user_id):
    data = request.get_json()
    entity_type = data.get("entity_type")
    extracted = data.get("extracted")   # the validated output
    rc_bn_number = extracted.get("bn_number") or extracted.get("rc_number")

    if not all([entity_type, extracted, rc_bn_number]):
        return jsonify({
            "status": "ERROR",
            "code": 400,
            "message": "Missing essential data eg. entity_type, extracted, rc_number or bn_number."
        })

    if entity_type not in ["business_name", "ltd_company"]:
        return jsonify({
            "status": "ERROR",
            "code": 400,
            "message": "The entity_type field has to be either 'business_name' or 'ltd_company'."
        })

    # Load stored data for the complete picture
    STORED = {}
    # ... (same loading logic as in extract endpoint)
    if entity_type == "business_name":
        BMOCK_DATA = loadRegistryJSON("business_names.json")['data']
        bn = rc_bn_number.strip().upper()
        if bn in BMOCK_DATA:
            STORED = BMOCK_DATA[bn]
    elif entity_type == "ltd_company":
        CMOCK_DATA = loadRegistryJSON("companies.json")['data']
        rc = rc_bn_number.strip().upper()
        if rc in CMOCK_DATA:
            STORED = CMOCK_DATA[rc]

    # Generate the PDF
    try:
        template_path = os.path.join(
            BASE_DIR, '..', 'cacdata', 'business_name.pdf' if entity_type == "business_name" else 'ltd_company.pdf')
        # you need an equivalent for company
        if entity_type == "business_name":
            pdf_buffer = fill_business_name_pdf(
                template_path, STORED, extracted)
        elif entity_type == "ltd_company":
            pdf_buffer = fill_ltd_company_pdf(template_path, STORED, extracted)
    except Exception as e:
        return jsonify({
            "status": "ERROR",
            "message": f"PDF generation failed: {e}.",
            "code": 500
        }), 500


    # Encode PDF to base64
    pdf_base64 = base64.b64encode(pdf_buffer.read()).decode('utf-8')

    # Update next deadline
    business_name = STORED.get("business_name") or STORED.get("company_name")
    result = next_filling_deadline(user_id, business_name, rc_bn_number, entity_type)

    return jsonify({
        "status": "SUCCESS",
        "code": 200,
        "message": "PDF generated successfully.",
        "pdf_base64": pdf_base64,
        "filename": f"{rc_bn_number}_annual_return.pdf",
        "deadline_update": result
    })
