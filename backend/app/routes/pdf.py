from flask import Blueprint, request, jsonify
from app.wrappers.user_required import user_required

pdf_bp = Blueprint("pdf_bp", __name__, url_prefix="/api/v1")


@pdf_bp.route("/generate-pdf", methods=['POST'])
@user_required
def extract_endpoint(user_id):
    data = request.get_json()

    return {}

