import requests
import os

BRIDGE_URL = os.getenv("GOOGLE_BRIDGE_URL")
FRONTEND_URL = os.getenv("FRONTEND_URL")


def send_cac_reminder(to_email: str, first_name: str, rc_bn: str, days_left: int):
    subject = f"⏰ {days_left} days left to file your CAC Annual Return"
    body = f"""
    <html>
        <body style="font-family: sans-serif;">
            <h2>Hello {first_name},</h2>
            <p>Your annual return for <strong>{rc_bn}</strong> is due in <strong>{days_left} days</strong>.</p>
            <p>File now at <a href="{FRONTEND_URL}">our app</a> to avoid delisting.</p>
            <p>Stay compliant,<br>SME Compliance Fast‑Track</p>
        </body>
    </html>
    """
    try:
        response = requests.post(BRIDGE_URL, json={
            "to": to_email,
            "subject": subject,
            "body": body
        }, timeout=10)
        return "✅" in response.text
    except Exception as e:
        print(f"Reminder failed for {to_email}: {e}")
        return False