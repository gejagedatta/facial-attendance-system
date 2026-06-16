from flask import Blueprint, request, jsonify

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from datetime import datetime

import base64
import numpy as np
import cv2

from app import db

from app.models.student_model import Student
from app.models.attendance_model import Attendance

from app.services.face_recognition_service import (
    generate_embedding_from_frame,
    compare_embeddings
)

from app.services.liveness_service import (
    detect_liveness
)

attendance_bp = Blueprint(
    "attendance",
    __name__
)


# ==========================================
# MARK ATTENDANCE
# ==========================================

@attendance_bp.route("/mark", methods=["POST"])
@jwt_required()
def mark_attendance():

    try:

        # ======================================
        # CURRENT INSTITUTE
        # ======================================

        current_institute = get_jwt_identity()

        data = request.get_json()

        image = data.get("image")

        if not image:

            return jsonify({
                "success": False,
                "message": "No image received"
            }), 400

        # ======================================
        # DECODE IMAGE
        # ======================================

        image_data = image.split(",")[1]

        image_bytes = base64.b64decode(
            image_data
        )

        np_arr = np.frombuffer(
            image_bytes,
            np.uint8
        )

        frame = cv2.imdecode(
            np_arr,
            cv2.IMREAD_COLOR
        )

        # ======================================
        # LIVENESS CHECK
        # ======================================

        liveness_result = detect_liveness(
            frame
        )

        if not liveness_result["is_real"]:

            return jsonify({
                "success": False,
                "message": "Fake face detected"
            }), 401

        # ======================================
        # GENERATE EMBEDDING
        # ======================================

        current_embedding = (
            generate_embedding_from_frame(
                frame
            )
        )

        if current_embedding is None:

            return jsonify({
                "success": False,
                "message": "Face not detected"
            }), 400

        # ======================================
        # GET ONLY CURRENT INSTITUTE STUDENTS
        # ======================================

        students = Student.query.filter_by(
            institute_id=current_institute
        ).all()

        if len(students) == 0:

            return jsonify({
                "success": False,
                "message": "No students found"
            }), 404

        # ======================================
        # BEST MATCH VARIABLES
        # ======================================

        best_match = None

        best_similarity = 0

        # ======================================
        # COMPARE EMBEDDINGS
        # ======================================

        for student in students:

            if not student.face_encoding:
                continue

            matched, similarity = compare_embeddings(

                current_embedding,

                student.face_encoding
            )

            print(
                f"Matching with {student.name} | Similarity: {similarity}"
            )

            # ==================================
            # KEEP HIGHEST SIMILARITY
            # ==================================

            if matched and similarity > best_similarity:

                best_match = student

                best_similarity = similarity

        # ======================================
        # NO MATCH FOUND
        # ======================================

        if best_match is None:

            return jsonify({
                "success": False,
                "message": "Unknown face"
            }), 404

        # ======================================
        # DUPLICATE CHECK
        # ======================================

        today = datetime.now().date()

        existing_attendance = Attendance.query.filter_by(

            student_id=best_match.student_id,

            date=today

        ).first()

        if existing_attendance:

            return jsonify({

                "success": False,

                "message":
                    f"{best_match.name} already marked present"
            })

        # ======================================
        # SAVE ATTENDANCE
        # ======================================

        attendance = Attendance(

            student_id=best_match.student_id,

            date=today,

            time=datetime.now().time(),

            status="Present",

            confidence_score=float(
                best_similarity
            )
        )

        db.session.add(attendance)

        db.session.commit()

        # ======================================
        # SUCCESS RESPONSE
        # ======================================

        return jsonify({

            "success": True,

            "message":
                f"Attendance marked for {best_match.name}",

            "student":
                best_match.to_dict(),

            "recognition_similarity":
                float(best_similarity),

            "liveness_confidence":
                liveness_result["confidence"]
        })

    except Exception as e:

        print("Attendance Error:", e)

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# ==========================================
# ATTENDANCE HISTORY
# ==========================================

@attendance_bp.route("/history", methods=["GET"])
@jwt_required()
def attendance_history():

    try:

        current_institute = get_jwt_identity()

        students = Student.query.filter_by(
            institute_id=current_institute
        ).all()

        student_ids = [
            student.student_id
            for student in students
        ]

        attendance = Attendance.query.filter(
            Attendance.student_id.in_(
                student_ids
            )
        ).all()

        result = []

        for item in attendance:

            student = Student.query.get(
                item.student_id
            )

            if not student:
                continue

            result.append({

                "attendance_id":
                    item.attendance_id,

                "student_name":
                    student.name,

                "roll_no":
                    student.roll_no,

                "department":
                    student.department,

                "year":
                    student.year,

                "date":
                    str(item.date),

                "time":
                    str(item.time),

                "status":
                    item.status,

                "confidence_score":
                    item.confidence_score
            })

        return jsonify({

            "success": True,

            "attendance":
                result
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# ==========================================
# TODAY ATTENDANCE
# ==========================================

@attendance_bp.route("/today", methods=["GET"])
@jwt_required()
def today_attendance():

    try:

        current_institute = get_jwt_identity()

        today = datetime.now().date()

        students = Student.query.filter_by(
            institute_id=current_institute
        ).all()

        student_ids = [
            student.student_id
            for student in students
        ]

        attendance = Attendance.query.filter(
            Attendance.student_id.in_(
                student_ids
            ),
            Attendance.date == today
        ).all()

        result = []

        for item in attendance:

            student = Student.query.get(
                item.student_id
            )

            if not student:
                continue

            result.append({

                "student_name":
                    student.name,

                "roll_no":
                    student.roll_no,

                "department":
                    student.department,

                "time":
                    str(item.time),

                "status":
                    item.status
            })

        return jsonify({

            "success": True,

            "attendance":
                result
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500