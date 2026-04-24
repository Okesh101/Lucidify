from flask import Blueprint, request, jsonify
from app.wrappers.user_required import user_required
from app.database.mockdata.helpers import verify_company, verify_business_name

registration_bp = Blueprint("registration_bp", __name__, url_prefix="/api/v1")

@registration_bp.route("/verify-registration", methods=['POST'])
@user_required
def verify_registration_endpoint(user_id):
    data = request.get_json()
    registration_number = data.get("registration_number")

    if not registration_number:
        return jsonify({"status": "ERROR",
                "code": 400,
                "message": "Missing required field."}), 400
    
    organization_type = registration_number[:2]
    if organization_type == "BN":
        result = verify_business_name(registration_number)
        return jsonify(result), result['code']
    elif organization_type == "RC":
        result = verify_company(registration_number)
        return jsonify(result), result['code']
    
    return jsonify({"status": "ERROR",
                    "code": "400",
                    "message": "Registration number provided is invalid. It doesn't follow standard format."
                    }), 400