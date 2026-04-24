from flask import Blueprint, request, jsonify
from app.wrappers.user_required import user_required

form_bp = Blueprint("form_bp", __name__, url_prefix="/api/v1")

@form_bp.route("/extract", methods=['POST'])
@user_required
def extract_endpoint(user_id):
    data = request.get_json()

    return {}


@form_bp.route("/validate", methods=['POST'])
@user_required
def validate_endpoint(user_id):
    data = request.get_json()

    return {}