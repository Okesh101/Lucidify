from flask import Blueprint, request, jsonify
from app.wrappers.user_required import user_required
from app.services.ai_service.prompts import build_prompt
from app.services.ai_service.aiService import ai_extract
from app.services.helperServices import validate_output, build_company_info
from app.database.mockdata.helpers import loadRegistryJSON

form_bp = Blueprint("form_bp", __name__, url_prefix="/api/v1")


@form_bp.route("/extract", methods=['POST'])
@user_required
def extract_endpoint(user_id):
    raw_data = request.get_json()
    data = raw_data.get("BusinessDetails", "")

    entity_type = data.get("entity_type")
    answers = data.get("answers")

    if not all([entity_type, answers]):
        return jsonify({"status": "ERROR",
                        "code": 400,
                        "message": "Missing entity type or answers"
                        }), 400
    
    if entity_type not in ["business_name", "ltd_company"]:
        return jsonify({"status": "ERROR",
                        "code": 400,
                        "message": "Error with entity_type field. Must be either 'business_name' or 'ltd_company'."
                        }), 400
    
    # 1. Load stored data
    STORED = {}
    try:
        if entity_type == "business_name":
            BMOCK_DATA = loadRegistryJSON("business_names.json")['data']
            bn = answers.get("bn_number", "").strip().upper() # Clean the input
            
            print(f"Searching for: '{bn}'") # Debug line
            print(f"Available keys: {list(BMOCK_DATA.keys())[:3]}") # Debug line
            
            if bn in BMOCK_DATA:
                STORED = BMOCK_DATA[bn]
            else:
                print("Key not found in BMOCK_DATA")
                
        # ... same for RC ...
        if entity_type == "ltd_company":
            CMOCK_DATA = loadRegistryJSON("companies.json")['data']
            rc = answers.get("rc_number", "").strip().upper() # Clean the input
            
            print(f"Searching for: '{rc}'") # Debug line
            print(f"Available keys: {list(CMOCK_DATA.keys())[:3]}") # Debug line
            
            if rc in CMOCK_DATA:
                STORED = CMOCK_DATA[rc]
            else:
                print("Key not found in CMOCK_DATA")
    except Exception as e:
        STORED = {}
        print(f"Error loading data: {e}")

    # 2. Call AI for extraction
    system_prompt, user_prompt = build_prompt(entity_type, answers, STORED) # Build prompt
    try: # Call AI service (choose Gemini or Groq)
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

    return jsonify({"status": "SUCCESS",
                    "code": 200,
                    "entity_type": entity_type,
                    "data": {
                        info: company_info,
                        "extracted": extracted_json,
                        "validation": {
                            "is_valid": is_valid,
                            "errors": errors
                        }
                    },
                    "message": "Successfully returned output containing info and validation."
                    }), 200