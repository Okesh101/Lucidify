import requests
from datetime import datetime
import os

BACKEND_URL = os.getenv("BACKEND_URL")

def continuous_ping():
    url = f"{BACKEND_URL}/api/v1/health"
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "OK":
                print(
                    f"✅ Ping successful at {datetime.now()}: {data.get('code')}"
                    )
        else:
            print(
                f"⚠️ Ping returned {response.status_code} at {datetime.now()}"
                )
    except Exception as e:
        print(f"❌ Ping failed at {datetime.now()}: {e}")
