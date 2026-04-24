from flask import request, jsonify
from app.database.functions.onboarding import get_current_user
from functools import wraps


def user_required(u):
    @wraps(u)
    def decorated_function(*args, **kwargs):
        user_id = get_current_user(
            request.cookies.get('session_id'))
        if not user_id:
            return jsonify({
                "status": "ERROR",
                "code": 401,
                "message": "Unauthorized. Please log in."
            }), 401

        # If valid, pass the user_id to the route or just continue
        return u(user_id, *args, **kwargs)

    return decorated_function
