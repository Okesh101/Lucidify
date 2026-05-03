from flask import Blueprint, request, jsonify
from app.wrappers.user_required import user_required
from app.database.mockdata.helpers import verify_organization, retrieve_organization_data

registration_bp = Blueprint("registration_bp", __name__, url_prefix="/api/v1")


@registration_bp.route("/verify-registration", methods=['POST'])
@user_required
def verify_registration_endpoint(user_id):
    data = request.get_json()
    registration_number = data.get("RegistrationNumber", "")

    if not registration_number:
        return jsonify({"status": "ERROR",
                "code": 400,
                "message": "Missing required arguement."}), 400
    
    organization_type = registration_number[:2]
    if organization_type not in ["BN", "RC"]:
        return jsonify({"status": "ERROR",
                    "code": 400,
                    "message": "Registration number provided is invalid. It doesn't follow standard format."
                    }), 400
    
    result = verify_organization(registration_number, organization_type)
    return jsonify(result), result['code']
    


@registration_bp.route("/verify-registration", methods=['GET'])
@user_required
def retrieve_registration_endpoint(user_id):
    regNumber = request.args.get("regNumber")

    if not regNumber:
        return jsonify({"status": "ERROR",
                "code": 400,
                "message": "Missing required field."}), 400
    
    organization_type = regNumber[:2]

    if organization_type not in ["BN", "RC"]:
        return jsonify({"status": "ERROR",
                    "code": 400,
                    "message": "Registration number provided is invalid. It doesn't follow standard format."
                    }), 400
    
    result = retrieve_organization_data(regNumber, organization_type)
    return jsonify(result), result['code']