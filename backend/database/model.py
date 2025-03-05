from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Producer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    contract_duration = db.Column(db.Integer, nullable=True)
    dollars_per_kg = db.Column(db.Float, nullable=False)
    available_kg = db.Column(db.Integer, nullable=True)
    logo_url = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f"<Producer {self.name}>"
