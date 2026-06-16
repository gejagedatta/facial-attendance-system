from flask import Blueprint, request, jsonify

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from app import db

from app.models.student_model import Student

student_bp = Blueprint(
    "students",
    __name__
)


# ==========================================
# ADD STUDENT
# ==========================================

@student_bp.route("/add", methods=["POST"])
@jwt_required()
def add_student():

    try:

        institute_id = get_jwt_identity()

        data = request.get_json()

        # ======================================
        # VALIDATION
        # ======================================

        if not data.get("name"):

            return jsonify({
                "success": False,
                "message": "Student name is required"
            }), 400

        if not data.get("roll_no"):

            return jsonify({
                "success": False,
                "message": "Roll number is required"
            }), 400

        # ======================================
        # DUPLICATE ROLL CHECK
        # ======================================

        existing_student = Student.query.filter_by(
            institute_id=institute_id,
            roll_no=data.get("roll_no")
        ).first()

        if existing_student:

            return jsonify({
                "success": False,
                "message": "Roll number already exists"
            }), 409

        # ======================================
        # CREATE STUDENT
        # ======================================

        new_student = Student(

            institute_id=institute_id,

            name=data.get("name"),

            roll_no=data.get("roll_no"),

            department=data.get("department"),

            year=data.get("year"),

            email=data.get("email"),

            phone=data.get("phone")
        )

        db.session.add(new_student)

        db.session.commit()

        return jsonify({

            "success": True,

            "message":
                "Student added successfully",

            "student":
                new_student.to_dict()
        })

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# ==========================================
# GET STUDENTS
# ==========================================

@student_bp.route("/", methods=["GET"])
@jwt_required()
def get_students():

    try:

        institute_id = get_jwt_identity()

        students = Student.query.filter_by(
            institute_id=institute_id
        ).all()

        return jsonify({

            "success": True,

            "total_students":
                len(students),

            "students": [

                student.to_dict()

                for student in students
            ]
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# ==========================================
# GET SINGLE STUDENT
# ==========================================

@student_bp.route(
    "/<int:student_id>",
    methods=["GET"]
)
@jwt_required()
def get_single_student(student_id):

    try:

        institute_id = get_jwt_identity()

        student = Student.query.filter_by(
            student_id=student_id,
            institute_id=institute_id
        ).first()

        if not student:

            return jsonify({
                "success": False,
                "message": "Student not found"
            }), 404

        return jsonify({

            "success": True,

            "student":
                student.to_dict()
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# ==========================================
# UPDATE STUDENT
# ==========================================

@student_bp.route(
    "/update/<int:student_id>",
    methods=["PUT"]
)
@jwt_required()
def update_student(student_id):

    try:

        institute_id = get_jwt_identity()

        student = Student.query.filter_by(
            student_id=student_id,
            institute_id=institute_id
        ).first()

        if not student:

            return jsonify({
                "success": False,
                "message": "Student not found"
            }), 404

        data = request.get_json()

        # ======================================
        # UPDATE FIELDS
        # ======================================

        student.name = data.get(
            "name",
            student.name
        )

        student.roll_no = data.get(
            "roll_no",
            student.roll_no
        )

        student.department = data.get(
            "department",
            student.department
        )

        student.year = data.get(
            "year",
            student.year
        )

        student.email = data.get(
            "email",
            student.email
        )

        student.phone = data.get(
            "phone",
            student.phone
        )

        db.session.commit()

        return jsonify({

            "success": True,

            "message":
                "Student updated successfully",

            "student":
                student.to_dict()
        })

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# ==========================================
# DELETE STUDENT
# ==========================================

@student_bp.route(
    "/delete/<int:student_id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_student(student_id):

    try:

        institute_id = get_jwt_identity()

        student = Student.query.filter_by(
            student_id=student_id,
            institute_id=institute_id
        ).first()

        if not student:

            return jsonify({
                "success": False,
                "message": "Student not found"
            }), 404

        db.session.delete(student)

        db.session.commit()

        return jsonify({

            "success": True,

            "message":
                "Student deleted successfully"
        })

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# ==========================================
# SEARCH STUDENTS
# ==========================================

@student_bp.route("/search", methods=["GET"])
@jwt_required()
def search_students():

    try:

        institute_id = get_jwt_identity()

        keyword = request.args.get(
            "keyword",
            ""
        )

        students = Student.query.filter(
            Student.institute_id == institute_id,
            Student.name.ilike(f"%{keyword}%")
        ).all()

        return jsonify({

            "success": True,

            "students": [

                student.to_dict()

                for student in students
            ]
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500