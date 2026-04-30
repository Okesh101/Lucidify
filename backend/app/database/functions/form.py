from app.database.db import get_db_connection
import sqlite3
import uuid


def recieve_extracted_data(user_id, entity_type, data):
    db = get_db_connection()
    try:
        cursor = db.cursor()

        # Check if exists
        cursor.execute(
            "SELECT id FROM business_data WHERE user_id = ?", (user_id,))
        existing = cursor.fetchone()

        if existing:
            cursor.execute("UPDATE business_data SET jsonData = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                        (str(data), existing['id']))
        else:
            cursor.execute("""
                INSERT INTO business_data (id, user_id, entity_type, jsonData)
                VALUES (?, ?, ?, ?)
            """, (str(uuid.uuid4()), user_id, entity_type, str(data),))
        
        db.commit()
        return {"status": "SUCCESS", 
                "code": 200, 
                "message": f"Business data {"updated" if existing else "entered"} successfully."
                }
    except sqlite3.Error as e:
        if db:
            db.rollback()
        return {"status": "ERROR",
                "code": 500,
                "message": f"Error saving extracted data to database: {e}."
                }
    finally:
        if db:
            db.close()
