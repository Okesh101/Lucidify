from werkzeug.security import generate_password_hash, check_password_hash
from app.database.db import get_db_connection
from datetime import datetime, timedelta, timezone
import sqlite3
import uuid


def hash_password(password):
    return generate_password_hash(password)


def create_session(session_id, user_id):
    db = get_db_connection()
    try:
        cursor = db.cursor()
        cursor.execute(
            "DELETE FROM sessions WHERE user_id = ?", (user_id,))
        cursor.execute("INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)",
                       (session_id, user_id, datetime.now() + timedelta(days=1)))
        db.commit()
    finally:
        if db:
            db.close()


def get_current_user(session_id):
    if not session_id:
        return None
    
    db = get_db_connection()
    try:
        cursor = db.cursor()
        cursor.execute("SELECT user_id FROM sessions WHERE id = ? AND expires_at > CURRENT_TIMESTAMP", (session_id,))
        session = cursor.fetchone()
        return session[0] if session else None
    finally:
        if db:
            db.close()


def signup(first_name, last_name, email, password_raw) -> dict:
    db = get_db_connection()
    try:
        password = hash_password(password_raw)
        cursor = db.cursor()
        query = """INSERT INTO users (id, first_name, last_name, email, password_hash) 
                   VALUES (?, ?, ?, ?, ?)"""
        cursor.execute(query, (str(uuid.uuid4()), first_name,
                       last_name, email, password))
        db.commit()
        return {"status": "CREATED",
                "code": 201,
                "message": "User onboarded successfully."}
    except sqlite3.IntegrityError:
        db.rollback()
        return {"status": "ERROR",
                "code": 400,
                "message": "Email already registered."}
    except sqlite3.Error as e:
        db.rollback()
        return {"status": "ERROR",
                "code": 500,
                "message": f"Error occurred while onboarding user: {e}."}
    finally:
        if db:
            db.close()


def login(email, password):
    db = get_db_connection()
    try:
        cursor = db.cursor()
        query = "SELECT id, password_hash, first_name FROM users WHERE email = ?"
        cursor.execute(query, (email,))
        user = cursor.fetchone()

        if user and check_password_hash(user[1], password):
            return {"status": "OK",
                    "message": "User login successful.",
                    "id": str(user[0]),
                    "name": user[2],
                    "code": 200}
        else:
            return {"status": "ERROR",
                    "message": "Invalid credentials.",
                    "code": 401}
    except Exception as e:
        return {"status": "ERROR",
                "message": f"Error occurred while logging in user: {e}.",
                "code": 500}
    finally:
        if db:
            db.close()


def logout(user_id):
    db = get_db_connection()
    try:
        cursor = db.cursor()
        cursor.execute("DELETE FROM sessions WHERE user_id = ?", (user_id,))
        db.commit()
        return {"status": "OK",
                "code": 200,
                "message": "User successfully logged out."}
    except Exception as e:
        db.rollback()
        return {"status": "ERROR",
                "code": 500,
                "message": f"Error occurred while logging out: {e}."}
    finally:
        if db:
            db.close()
