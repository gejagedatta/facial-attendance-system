from app import db
from datetime import datetime


class Student(db.Model):

    __tablename__ = "students"

    # ==========================================
    # PRIMARY KEY
    # ==========================================

    student_id = db.Column(
        db.Integer,
        primary_key=True
    )

    # ==========================================
    # FOREIGN KEY
    # ==========================================

    institute_id = db.Column(
        db.Integer,
        db.ForeignKey(
            "institutes.institute_id"
        ),
        nullable=False
    )

    # ==========================================
    # STUDENT DETAILS
    # ==========================================

    name = db.Column(
        db.String(255),
        nullable=False
    )

    roll_no = db.Column(
        db.String(100),
        nullable=False
    )

    department = db.Column(
        db.String(255)
    )

    year = db.Column(
        db.String(50)
    )

    email = db.Column(
        db.String(255)
    )

    phone = db.Column(
        db.String(20)
    )

    # ==========================================
    # FACE ENCODING
    # ==========================================

    face_encoding = db.Column(
        db.JSON,
        nullable=True
    )

    # ==========================================
    # CREATED DATE
    # ==========================================

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    # ==========================================
    # ATTENDANCE RELATION
    # ==========================================

    attendance = db.relationship(
        "Attendance",
        backref="student",
        lazy=True,
        cascade="all, delete"
    )

    # ==========================================
    # CONVERT TO JSON
    # ==========================================

    def to_dict(self):

        return {

            "student_id": self.student_id,

            "institute_id": self.institute_id,

            "name": self.name,

            "roll_no": self.roll_no,

            "department": self.department,

            "year": self.year,

            "email": self.email,

            "phone": self.phone,

            "created_at": str(
                self.created_at
            )
        }