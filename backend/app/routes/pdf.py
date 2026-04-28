from flask import Blueprint, request, jsonify
from app.wrappers.user_required import user_required
from app.database.mockdata.helpers import loadRegistryJSON
from app.services.pdfService import fill_business_name_pdf
from app.database.functions.pdf import next_filling_deadline
import os

pdf_bp = Blueprint("pdf_bp", __name__, url_prefix="/api/v1")
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


@pdf_bp.route("/generate-pdf", methods=['POST'])
@user_required
def generate_pdf(user_id):
    data = request.get_json()
    entity_type = data.get("entity_type")
    extracted = data.get("extracted")   # the validated output
    rc_bn_number = extracted.get("bn_number") or extracted.get("rc_number")

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
        pdf_buffer = fill_business_name_pdf(
            template_path, STORED, extracted) if entity_type == "business_name" else fill_company_pdf(...)
    except Exception as e:
        return jsonify({
            "status": "ERROR", 
            "message": f"PDF generation failed: {e}", 
            "code": 500
        }), 500

    # Update next_filing_deadline in business_entities
    if entity_type == "business_name":
        business_name = STORED['business_name']
    else:
        business_name = STORED['company_name']
    result = next_filling_deadline(user_id, business_name)

    return send_file(
        pdf_buffer,
        mimetype='application/pdf',
        as_attachment=True,
        download_name=f"{rc_bn_number}_annual_return.pdf"
    )

