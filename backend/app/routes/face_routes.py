from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

import os
import base64
import traceback

import cv2
import numpy as np

from app import db

from app.models.student_model import Student

from app.services.face_recognition_service import (
    generate_embedding
)

face_bp = Blueprint(
    "face",
    __name__
)


# ==========================================
# FACE REGISTER
# ==========================================

@face_bp.route("/register", methods=["POST"])
@jwt_required()
def register_face():

    try:

        data = request.get_json()

        student_id = data.get(
            "student_id"
        )

        images = data.get("images")

        if not student_id or not images:

            return jsonify({
                "success": False,
                "message": "Missing data"
            }), 400

        # ======================================
        # CREATE STUDENT FOLDER
        # ======================================

        student_folder = os.path.join(
            "uploads",
            "students",
            str(student_id)
        )

        os.makedirs(
            student_folder,
            exist_ok=True
        )

        # ======================================
        # SAVE IMAGES
        # ======================================

        for index, image in enumerate(images):

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

            image_path = os.path.join(
                student_folder,
                f"{index}.jpg"
            )

            cv2.imwrite(
                image_path,
                frame
            )

        return jsonify({
            "success": True,
            "message": "Face dataset saved successfully"
        })

    except Exception as e:

        traceback.print_exc()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# ==========================================
# GENERATE FACE ENCODING
# ==========================================

@face_bp.route(
    "/generate-encoding/<int:student_id>",
    methods=["POST"]
)
@jwt_required()
def generate_face_encoding(student_id):

    try:

        # ======================================
        # STUDENT FOLDER
        # ======================================

        student_folder = os.path.join(
            "uploads",
            "students",
            str(student_id)
        )

        if not os.path.exists(student_folder):

            return jsonify({
                "success": False,
                "message": "Dataset folder not found"
            }), 404

        embeddings = []

        # ======================================
        # READ ALL IMAGES
        # ======================================

        for image_name in os.listdir(
            student_folder
        ):

            image_path = os.path.join(
                student_folder,
                image_name
            )

            print(
                "Processing:",
                image_path
            )

            embedding = generate_embedding(
                image_path
            )

            if embedding is not None:

                embeddings.append(
                    embedding
                )

        # ======================================
        # NO EMBEDDINGS
        # ======================================

        if len(embeddings) == 0:

            return jsonify({
                "success": False,
                "message": "No valid face embeddings generated"
            }), 400

        # ======================================
        # AVERAGE EMBEDDING
        # ======================================

        average_embedding = np.mean(
            np.array(embeddings),
            axis=0
        )

        # ======================================
        # GET STUDENT
        # ======================================

        student = Student.query.get(
            student_id
        )

        if not student:

            return jsonify({
                "success": False,
                "message": "Student not found"
            }), 404

        # ======================================
        # SAVE ENCODING
        # ======================================

        student.face_encoding = (
            average_embedding.tolist()
        )

        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Face encoding generated successfully"
        })

    except Exception as e:

        traceback.print_exc()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500