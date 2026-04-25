from flask import Blueprint, request, jsonify
from app.wrappers.user_required import user_required
from app.services.prompts import build_prompt
from app.services.aiService import ai_extract
from app.services.validator import validate_output

form_bp = Blueprint("form_bp", __name__, url_prefix="/api/v1")

@form_bp.route("/extract", methods=['POST'])
@user_required
def extract_endpoint(user_id):
    data = request.get_json()
    entity_type = data.get("entity_type")
    answers = data.get("answers")

    if not all([entity_type, answers]):
        return jsonify({"status": "ERROR",
                        "code": 400,
                        "message": "Missing entity type or answers"}), 400

    # Build prompt
    system_prompt, user_prompt = build_prompt(entity_type, answers)

    # Call AI service (choose Gemini or Groq)
    try:
        extracted_json = ai_extract(system_prompt, user_prompt)
    except Exception as e:
        return jsonify({"status": "ERROR",
                        "message": f"AI extraction failed: {str(e)}.",
                        "code": 500}), 500
    
    
    # Validate against legal dictionary
    is_valid, errors = validate_output(extracted_json, entity_type)
    if not is_valid:
        # Still return the output but with validation errors for user to see
        return jsonify({
            "status": "SUCCESS",
            "data": extracted_json,
            "validation_errors": errors
        }), 200
    return jsonify({"status": "SUCCESS",
                    "code": 200,
                    "data": extracted_json,
                    "message": "Successfully validated output."}), 200

    return {}


@form_bp.route("/validate", methods=['POST'])
@user_required
def validate_endpoint(user_id):
    data = request.get_json()
    entity_type = data.get("entity_type")
    form_data = data.get("data")

    is_valid, errors = validate_output(form_data, entity_type)
    return jsonify({"status": "OK",
                    "is_valid": is_valid,
                    "errors": errors,
                    "code": 200,
                    "message": "Data validated successfully against CAC rules and AI Hallucination."
                    }), 200