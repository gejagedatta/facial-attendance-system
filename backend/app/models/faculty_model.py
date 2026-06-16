from app import db
from datetime import datetime


class Faculty(db.Model):
    __tablename__ = "faculty"

    faculty_id = db.Column(db.Integer, primary_key=True)

    institute_id = db.Column(
        db.Integer,
        db.ForeignKey("institutes.institute_id"),
        nullable=False
    )

    name = db.Column(db.String(255), nullable=False)

    subject = db.Column(db.String(255))

    email = db.Column(db.String(255))

    phone = db.Column(db.String(20))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "faculty_id": self.faculty_id,
            "name": self.name,
            "subject": self.subject,
            "email": self.email,
            "phone": self.phone
        }