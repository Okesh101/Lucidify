from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

def create_app():
	app = Flask(__name__)
	CORS(app)

	from app.routes.health import health_bp

	app.register_blueprint(health_bp)

	return app

if __name__ == "__main__":
	app = create_app()
	app.run(debug=True, use_reloader=True)
