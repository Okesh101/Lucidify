from flask import Blueprint, request, jsonify, send_file
from app.wrappers.user_required import user_required
from app.database.mockdata.helpers import loadRegistryJSON
from app.services.pdfService import fill_business_name_pdf, fill_ltd_company_pdf
from app.database.functions.pdf import next_filling_deadline
from app.database.functions.form import retrieve_extracted_data
import os, json


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

pdf_bp = Blueprint("pdf_bp", __name__, url_prefix="/api/v1")


@pdf_bp.route("/generate-pdf", methods=['GET'])
@user_required
def generate_pdf(user_id):
    rc_bn_number = request.args.get("regNumber", "")
    if not rc_bn_number:
        return jsonify({
            "status": "ERROR",
            "code": 400,
            "message": "Missing regNumber query parameter."
        })
    
    if rc_bn_number.startswith("BN"):
        entity_type = "business_name"
    elif rc_bn_number.startswith("RC"):
        entity_type = "ltd_company"
    else:
        return jsonify({
            "status": "ERROR",
            "code": 400,
            "message": "Invalid rc_bn_number. Must start with 'BN' for business names or 'RC' for companies."
        })
    
    # Retrieve the latest extracted data for this user and entity
    extracted_result = retrieve_extracted_data(user_id, entity_type)
    if extracted_result['code'] != 200:
        return jsonify(extracted_result), extracted_result['code']


    # Fetching the financial year for filing PDF from database records
    if entity_type == "business_name":
        upd_year_available = extracted_result.get('updatedYear') or ""
        if upd_year_available != "":
            upd_year = upd_year_available.split("-")[0] if upd_year_available else ""
        else:
            upd_year = extracted_result.get('createdYear').split("-")[0] if extracted_result.get('createdYear') else ""
    elif entity_type == "ltd_company":
        upd_year_available = extracted_result.get('updatedYear') or ""
        if upd_year_available != "":
            upd_year = upd_year_available.split()[0] if upd_year_available else ""
        else:            
            upd_year = extracted_result.get('createdYear').split()[0] if extracted_result.get('createdYear') else ""

    extracted = extracted_result['jsonData']['return_summary']
    
    if entity_type == "business_name":
        extracted['financial_year_end'] = int(upd_year) - 1 if upd_year else ""
    elif entity_type == "ltd_company":
        extracted['financial_year_end'] = upd_year if upd_year else ""
    

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

    # Update next deadline
    business_name = STORED.get("business_name") or STORED.get("company_name")
    deadline_result = next_filling_deadline(user_id, business_name, rc_bn_number, entity_type)

    response = send_file(
        pdf_buffer,
        mimetype='application/pdf',
        as_attachment=True,
        download_name=f"{rc_bn_number}_annual_return.pdf"
    )

    response.headers['X-Deadline-Update'] = json.dumps(deadline_result)
    response.headers['Access-Control-Expose-Headers'] = 'X-Deadline-Update'

    return response
