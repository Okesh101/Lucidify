from app.database.db import get_db_connection
from app.services.emailService import send_cac_reminder
from datetime import date, timedelta
import sqlite3


def check_and_send_reminders():
    db = get_db_connection()
    try:
        cursor = db.cursor()
        today = date.today()
        # get all entities with upcoming deadlines within 30 days
        cursor.execute("""
            SELECT e.id, e.user_id, e.rc_bn_number, e.next_filing_deadline, e.last_reminder_sent_days, u.email, u.first_name
            FROM business_entities e
            JOIN users u ON e.user_id = u.id
            WHERE e.next_filing_deadline BETWEEN ? AND ?
        """, (today, today + timedelta(days=30)))
        rows = cursor.fetchall()

        if rows is None:
            print({"status": "SUCCESS",
                    "code": 200,
                    "message": "No user is ready for reminder yet."})

        for row in rows:
            days_left = (row['next_filing_deadline'] - today).days
            # send if days_left in [30,20,7,3,2,1] and not already sent for that day
            if days_left in [30, 20, 7, 3, 2, 1] and row['last_reminder_sent_days'] != days_left:
                if send_cac_reminder(row['email'], row['first_name'], row['rc_bn_number'], days_left):
                    # update sent flag
                    cursor.execute(
                        "UPDATE business_entities SET last_reminder_sent_days = ? WHERE id = ?", (days_left, row['id'],))
                else:
                    print({"status": "ERROR",
                            "code": 500,
                            "message": "Error sending reminder mail from google."})

        db.commit()
        print({"status": "SUCCESS",
                "code": 200,
                "message": "Email sent successfully as reminder."
                })
    except sqlite3.Error as e:
        db.rollback()
        print({"status": "ERROR",
                "code": 500,
                "message": f"Internal server error checking and sending email reminders: {e}."
                })
    finally:
        if db:
            db.close()

