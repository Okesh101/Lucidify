from flask import Blueprint, request, jsonify
from app.wrappers.user_required import user_required
from app.services.ai_service.prompts import build_prompt
from app.services.ai_service.aiService import ai_extract
from app.services.helperServices import validate_output, build_company_info
from app.database.mockdata.helpers import loadRegistryJSON
from app.database.functions.form import recieve_extracted_data, retrieve_extracted_data


form_bp = Blueprint("form_bp", __name__, url_prefix="/api/v1")


@form_bp.route("/extract", methods=['POST'])
@user_required
def extract_endpoint(user_id):
    raw_data = request.get_json()
    data = raw_data.get("BusinessDetails", "")

    entity_type = data.get("entity_type")
    answers = data.get("answers")
    reg_no = data.get("registration_number")

    if not all([entity_type, answers, reg_no]):
        return jsonify({"status": "ERROR",
                        "code": 400,
                        "message": "Missing entity type or answers or registration number"
                        }), 400

    if entity_type not in ["business_name", "ltd_company"]:
        return jsonify({"status": "ERROR",
                        "code": 400,
                        "message": "Error with entity_type field. Must be either 'business_name' or 'ltd_company'."
                        }), 400

    # 1. Load stored data
    STORED = {}
    filename = "business_names.json" if entity_type == "business_name" else "companies.json"
    try:
        registry = loadRegistryJSON(filename)['data']
        STORED = registry.get(reg_no, {})
    except Exception as e:
        print(f"Registry lookup error: {e}")

    # 2. Call AI for extraction
    system_prompt, user_prompt = build_prompt(
        entity_type, answers, STORED)  # Build prompt
    
    try:  # Call AI service (choose Gemini or Groq)
        extracted_json = ai_extract(system_prompt, user_prompt)
    except Exception as e:
        return jsonify({"status": "ERROR",
                        "message": f"AI extraction failed: {str(e)}.",
                        "code": 500}), 500

    # 3. Validate output
    is_valid, errors = validate_output(extracted_json, entity_type)

    # 4. Build company_info from stored_data
    company_info = build_company_info(STORED, entity_type)

    if entity_type == "business_name":
        info = "business_info"
    else:
        info = "company_info"

    finalizedData = {
        info: company_info,
        "return_summary": extracted_json,
        "validation": {
            "is_valid": is_valid,
            "errors": errors
        }
    }

    result = recieve_extracted_data(user_id, entity_type, finalizedData)
    print(result)
    return jsonify(result), result['code']


@form_bp.route("/review", methods=['GET'])
@user_required
def review_endpoint(user_id):
    type = request.args.get("type", "")

    if type not in ["business_name", "ltd_company"]:
        return jsonify({"status": "ERROR",
                        "code": 400,
                        "message": "Error with type query parameter. Must be either 'business_name' or 'ltd_company'."
                        }), 400
    
    result = retrieve_extracted_data(user_id, type)
    if result['code'] != 200:
        return jsonify(result), result['code']

    return jsonify({
        "status": result['status'],
        "code": result['code'],
        "data": result['jsonData'],
        "entity_type": result['entity_type'],
        "message": result['message']
    })
