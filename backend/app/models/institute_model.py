from app import db
from datetime import datetime


class Institute(db.Model):
    __tablename__ = "institutes"

    institute_id = db.Column(db.Integer, primary_key=True)

    institute_name = db.Column(db.String(255), nullable=False)

    email = db.Column(db.String(255), unique=True, nullable=False)

    password_hash = db.Column(db.String(255), nullable=False)

    phone = db.Column(db.String(20))

    address = db.Column(db.String(500))

    subscription_plan = db.Column(db.String(50), default="free")

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship
    students = db.relationship(
        "Student",
        backref="institute",
        lazy=True,
        cascade="all, delete"
    )

    faculty = db.relationship(
        "Faculty",
        backref="institute",
        lazy=True,
        cascade="all, delete"
    )

    def to_dict(self):
        return {
            "institute_id": self.institute_id,
            "institute_name": self.institute_name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address,
            "subscription_plan": self.subscription_plan
        }