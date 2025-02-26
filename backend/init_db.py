from app import create_app
from database.model import db, Producer

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

    initial_producers = [
        Producer(name="Producer A", location="USA"),
        Producer(name="Producer B", location="Canada"),
        Producer(name="Producer C", location="France"),
    ]

    db.session.add_all(initial_producers)
    db.session.commit()

    print("Database initialized")
