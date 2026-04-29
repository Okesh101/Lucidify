from flask import Blueprint, request, jsonify, make_response
from app.wrappers.user_required import user_required
from app.database.functions.onboarding import create_session, signup, login, logout
from dotenv import load_dotenv
import secrets
import os

load_dotenv()

is_production = os.getenv("FLASK_ENV") == "production"

auth_bp = Blueprint('auth_bp', __name__, url_prefix='/api/v1/auth')


@auth_bp.route('/signup', methods=['POST'])
def signup_endpoint():
    raw_data = request.get_json()
    data = raw_data.get("AuthDetails", "")

    if not data:
        return jsonify({"status": "ERROR",
                        "message": "Missing userDetails in request body",
                        "code": 400}), 400

    first_name = data.get('first_name', '')
    last_name = data.get('last_name', '')
    email = data.get('email', '')
    password = data.get('password', '')

    if not all([first_name, last_name, email, password]):
        return jsonify({"status": "ERROR",
                        "message": "Missing required fields",
                        "code": 400}), 400
    result = signup(first_name, last_name, email, password)
    return jsonify(result), result['code']


@auth_bp.route('/login', methods=['POST'])
def login_endpoint():
    raw_data = request.get_json()
    data = raw_data.get("AuthDetails", "")

    if not data:
        return jsonify({"status": "ERROR",
                        "message": "Missing userDetails in request body",
                        "code": 400}), 400

    email = data.get('email', "")
    password = data.get('password', "")

    if not all([email, password]):
        return jsonify({"status": "ERROR",
                        "message": "Missing required fields",
                        "code": 400}), 400

    result = login(email, password)
    if result['code'] == 200:
        session_id = secrets.token_hex(32)
        create_session(session_id, result['id'])

        response = make_response(jsonify(result), 200)
        response.set_cookie('session_id',
                            session_id,
                            path='/',
                            httponly=True,
                            secure=is_production,
                            samesite='None' if is_production else 'Lax',
                            max_age=86400
                            )
        return response, 200

    return jsonify(result), result['code']


@auth_bp.route("/logout", methods=['POST'])
@user_required
def logout_endpoint(user_id):
    result = logout(user_id)
    if result['code'] == 200:
        response = make_response(jsonify(result), 200)
        response.delete_cookie('session_id')
        return response, 200
    return jsonify(result), result["code"]
