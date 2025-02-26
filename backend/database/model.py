from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Producer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"<Producer {self.name}>"
