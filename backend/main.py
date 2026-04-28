from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from app.database.db import init_db
# from app.services.pdfService import pdfFields

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)

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

    return app


if __name__ == "__main__":
    init_db()
    # pdfFields()
    app = create_app()
    app.run(debug=True, use_reloader=True)
