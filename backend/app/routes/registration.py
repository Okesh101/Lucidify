from flask import Blueprint, request, jsonify
from app.wrappers.user_required import user_required

registration_bp = Blueprint("registration_bp", __name__, url_prefix="/api/v1")

@registration_bp.route("/verify-registration", methods=['POST'])
@user_required
def verify_registration_endpoint(user_id):
    data = request.get_json()
    registration_number = data.get("registration_number")

    if not registration_number:
        return {"status": "ERROR",
                "code": 400,
                "message": "Missing required field."}
    
    return {}