from app.database.db import get_db_connection
from datetime import date
import sqlite3
import uuid


def next_filling_deadline(user_id, business_name, rc_bn_number, entity_type):
    db = get_db_connection()
    try:
        next_deadline = date.today().replace(year=date.today().year + 1, month=6, day=30)
        cur = db.cursor()
        # Check if exists
        cur.execute(
            "SELECT id FROM business_entities WHERE user_id = ? AND rc_bn_number = ?", (user_id, rc_bn_number))
        existing = cur.fetchone()

        if existing:
            cur.execute("UPDATE business_entities SET next_filing_deadline = ?, last_reminder_sent_days = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                        (next_deadline, existing['id']))
        else:
            cur.execute("""
                INSERT INTO business_entities (id, user_id, business_name, rc_bn_number, entity_type, next_filing_deadline)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (str(uuid.uuid4()), user_id, business_name, rc_bn_number, entity_type, next_deadline))

        db.commit()
        return {"status": "SUCCESS", 
                "code": 200, 
                "message": "Next filing deadline updated."
                }
    except sqlite3.Error as e:
        db.rollback()
        return {"status": "ERROR", 
                "code": 500, 
                "message": f"DB error filling deadline: {e}."
                }
    finally:
        if db:
            db.close()
