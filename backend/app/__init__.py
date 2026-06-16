from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from dotenv import load_dotenv
import os

db = SQLAlchemy()
jwt = JWTManager()
bcrypt = Bcrypt()

def create_app():
    load_dotenv()

    app = Flask(__name__)

    # ========================
    # DATABASE CONFIG
    # ========================

    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = os.getenv("DB_PORT")
    DB_NAME = os.getenv("DB_NAME")

    app.config["SQLALCHEMY_DATABASE_URI"] = (
        f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # ========================
    # JWT CONFIG
    # ========================

    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

    # ========================
    # INITIALIZE EXTENSIONS
    # ========================

    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)

    CORS(app)


    # ========================
    # HOME ROUTE
    # ========================

    @app.route("/")
    def home():
        return {
            "message": "AI Facial Recognition Attendance API Running"
        }
    
    # ========================
    # IMPORT MODELS
    # ========================
    from app.models.institute_model import Institute
    from app.models.student_model import Student
    from app.models.faculty_model import Faculty
    from app.models.attendance_model import Attendance
    # ========================
    # CREATE DATABASE TABLES
    # ========================

    with app.app_context():
        db.create_all()
#api test
    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    
    from app.routes.student_routes import student_bp
    app.register_blueprint(
    student_bp,
    url_prefix="/api/students"
)
    
    from app.routes.face_routes import face_bp
    app.register_blueprint(
    face_bp,
    url_prefix="/api/face"
)
    
    from app.routes.attendance_routes import attendance_bp
    app.register_blueprint(
    attendance_bp,
    url_prefix="/api/attendance"
)
    return app