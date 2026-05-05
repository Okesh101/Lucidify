from app.database.db import get_db_connection
import sqlite3
import uuid
import ast


def recieve_extracted_data(user_id, entity_type, data):
    db = get_db_connection()
    try:
        cursor = db.cursor()

        # Check if exists
        cursor.execute(
            "SELECT id FROM business_data WHERE user_id = ? AND entity_type = ?", (user_id, entity_type))
        existing = cursor.fetchone()

        if existing:
            cursor.execute("UPDATE business_data SET jsonData = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                        (str(data), existing['id'],))
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


def retrieve_extracted_data(user_id, type):
    db = get_db_connection()
    try:
        cursor = db.cursor()
        cursor.execute(
            """SELECT entity_type, jsonData, updated_at, created_at FROM business_data 
                WHERE user_id = ? AND entity_type = ?
            """, (user_id, type,)
        )
        fullData = cursor.fetchone()
        
        if fullData == None:
            return {"status": "ERROR",
                    "code": 404,
                    "message": "This user does not have data available to be retrieved."
                    }
        
        return {"status": "SUCCESS",
                "code": 200,
                "entity_type": fullData[0],
                "jsonData": ast.literal_eval(fullData[1]),
                "updatedYear": fullData[2],
                "createdYear": fullData[3],
                "message": "Fetched data successfully for review."
                }
    except sqlite3.Error as e:
        return {"status": "ERROR",
                "code": 500,
                "message": f"Error fetching business data for review: {e}."
                }
    finally:
        if db:
            db.close()
