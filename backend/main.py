from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from app.database.db import init_db
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.executors.pool import ThreadPoolExecutor
import atexit
import os
import pytz

load_dotenv()


def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)

    from app.routes.health import health_bp
    from app.routes.auth import auth_bp
    from app.routes.registration import registration_bp
    from app.routes.form import form_bp
    from app.routes.pdf import pdf_bp

    app.register_blueprint(health_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(registration_bp)
    app.register_blueprint(form_bp)
    app.register_blueprint(pdf_bp)

    # Start scheduler only once (avoid duplicate in Flask reloader)
    if not app.debug or os.environ.get("WERKZEUG_RUN_MAIN") == "true":
        init_scheduler(app)
    
    return app


def init_scheduler(app):
    """Configure and start APScheduler with ping and reminder jobs."""
    job_defaults = {
        'coalesce': True,          # don't run multiple if missed
        'max_instances': 1
    }
    scheduler = BackgroundScheduler(
        executors={'default': ThreadPoolExecutor(5)},
        job_defaults=job_defaults,
        timezone=pytz.timezone("Africa/Lagos")
    )

    # Import here to avoid circular imports
    from app.services.scheduler import continuous_ping
    from app.database.functions.scheduling import check_and_send_reminders

    scheduler.add_job(
        id='ping_server',
        func=continuous_ping,
        trigger='interval',
        minutes=10,
        replace_existing=True
    )

    scheduler.add_job(
        id='send_reminders',
        func=check_and_send_reminders,
        trigger='interval',
        hours=24,
        replace_existing=True
    )

    scheduler.start()
    atexit.register(lambda: scheduler.shutdown())

    print("📅 Scheduler started with ping and reminder jobs.")
    print(scheduler.get_jobs())

app = create_app()

if __name__ == "__main__":
    init_db()
    app = create_app()
    app.run(debug=True, use_reloader=True)
