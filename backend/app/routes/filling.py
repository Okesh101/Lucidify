from flask import Blueprint, request, jsonify
from app.wrappers.user_required import user_required

filling_bp = Blueprint("filling_bp", __name__, url_prefix="/api/v1")


@filling_bp.route("/save", methods=['POST'])
@user_required
def saving_endpoint(user_id):
    data = request.get_json()

    return {}


@filling_bp.route("/<id>", methods=['GET'])
@user_required
def get_id_for_filling_endpoint(user_id):
    data = request.get_json()

    return {}


@filling_bp.route("/list", methods=['GET'])
@user_required
def list_endpoint(user_id):
    data = request.get_json()

    return {}
