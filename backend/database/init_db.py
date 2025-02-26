from database.model import db, Producer

def init_db(app):
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
