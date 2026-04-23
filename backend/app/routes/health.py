from flask import Blueprint, jsonify

health_bp = Blueprint("health_bp", __name__, url_prefix="/api/v1")

@health_bp.route("/health", methods=['GET'])
def health_endpoint():
	return jsonify({"status": "OK",
			"message": "Service is running",
			"code": 200
			}), 200
