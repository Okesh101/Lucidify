import requests
import os

BRIDGE_URL = os.getenv("GOOGLE_BRIDGE_URL")
FRONTEND_URL = os.getenv("FRONTEND_URL")


def send_cac_reminder(to_email: str, first_name: str, rc_bn: str, days_left: int):
    subject = f"⏰ {days_left} days left to file your CAC Annual Return"
    body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
                <td align="center" style="padding: 40px 0;">
                    <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                        <!-- Header Accent -->
                        <tr>
                            <td style="background-color: #16a34a; height: 6px;"></td>
                        </tr>
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <h2 style="color: #111827; margin-top: 0; font-size: 24px;">Hello {first_name},</h2>
                                <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                                    This is a friendly reminder that the annual return for 
                                    <strong style="color: #111827;">{rc_bn}</strong> is due in 
                                    <span style="color: #dc2626; font-weight: bold;">{days_left} days</span>.
                                </p>
                                
                                <!-- CTA Button -->
                                <table border="0" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                    <tr>
                                        <td align="center" bgcolor="#16a34a" style="border-radius: 8px;">
                                            <a href="{FRONTEND_URL}" target="_blank" style="padding: 14px 28px; font-size: 16px; color: #ffffff; text-decoration: none; font-weight: bold; display: inline-block;">
                                                File Annual Return Now
                                            </a>
                                        </td>
                                    </tr>
                                </table>

                                <p style="color: #6b7280; font-size: 14px; border-top: 1px solid #f3f4f6; padding-top: 20px; margin-top: 30px;">
                                    Stay compliant,<br>
                                    <strong>SME Compliance Fast‑Track Team</strong>
                                </p>
                            </td>
                        </tr>
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f9fafb; padding: 20px; text-align: center;">
                                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                                    You received this because your business is registered with our platform.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
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