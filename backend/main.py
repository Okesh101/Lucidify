from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from app.database.db import init_db

load_dotenv()

def create_app():
	app = Flask(__name__)
	CORS(app)

	from app.routes.health import health_bp
	from app.routes.auth import auth_bp

	app.register_blueprint(health_bp)
	app.register_blueprint(auth_bp)

	return app

if __name__ == "__main__":
	init_db()
	app = create_app()
	app.run(debug=True, use_reloader=True)
