from app.database.db import get_db_connection
from datetime import date
import sqlite3, uuid


def next_filling_deadline(user_id, business_name, rc_bn_number, entity_type, next_deadline, last_reminder_sent_days):
    db = get_db_connection()
    try:
        cursor = db.cursor()
        next_deadline = date.today().replace(year=date.today().year + 1, month=6, day=30)

        cursor.execute("UPDATE business_entities SET next_filing_deadline = ? WHERE user_id = ? AND rc_bn_number = ?",
                       (next_deadline, user_id, rc_bn_number))
        db.commit()
        db.close()
    except sqlite3.IntegrityError:
        db.rollback()
        return {"status": "ERROR",
                "code": 400,
                "message": "User already filled now."}
    except sqlite3.Error as e:
        db.rollback()
        return {"status": "ERROR",
            "code": 500,
            "message": f"Error occurred while filling next deadline: {e}."}
    finally:
        if db:
            db.close()
