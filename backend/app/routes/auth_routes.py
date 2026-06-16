from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app import db, bcrypt

from app.models.institute_model import Institute

auth_bp = Blueprint("auth", __name__)


# ==========================================
# REGISTER
# ==========================================

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    institute_name = data.get("institute_name")
    email = data.get("email")
    password = data.get("password")

    # Check existing email
    existing = Institute.query.filter_by(email=email).first()

    if existing:
        return jsonify({
            "success": False,
            "message": "Email already exists"
        }), 400

    # Hash password
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    new_institute = Institute(
        institute_name=institute_name,
        email=email,
        password_hash=hashed_password
    )

    db.session.add(new_institute)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Institute registered successfully"
    })


# ==========================================
# LOGIN
# ==========================================

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    institute = Institute.query.filter_by(email=email).first()

    if not institute:
        return jsonify({
            "success": False,
            "message": "Invalid email"
        }), 401

    valid_password = bcrypt.check_password_hash(
        institute.password_hash,
        password
    )

    if not valid_password:
        return jsonify({
            "success": False,
            "message": "Invalid password"
        }), 401

    access_token = create_access_token(
        identity=str(institute.institute_id)
    )

    return jsonify({
        "success": True,
        "token": access_token,
        "institute": institute.to_dict()
    })