from app import db
from datetime import datetime


class Attendance(db.Model):

    __tablename__ = "attendance"

    attendance_id = db.Column(
        db.Integer,
        primary_key=True
    )

    student_id = db.Column(
        db.Integer,
        db.ForeignKey("students.student_id"),
        nullable=False
    )

    date = db.Column(
        db.Date,
        nullable=False
    )

    time = db.Column(
        db.Time,
        nullable=False
    )

    status = db.Column(
        db.String(50),
        default="Present"
    )

    confidence_score = db.Column(
        db.Float
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def to_dict(self):

        return {
            "attendance_id": self.attendance_id,
            "student_id": self.student_id,
            "date": str(self.date),
            "time": str(self.time),
            "status": self.status,
            "confidence_score": self.confidence_score
        }