from database.model import db, Producer

producers = [
    Producer(
        name="HydroGreen",
        description="Description for Montreal Producer 1",
        postal_code="H1A 0A1",
        latitude=45.5017,
        longitude=-73.5673,
        contract_type="Type A",
        contract_duration=12,
        dollars_per_kg=10.0,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1740541092/marker_egpvvm.png"
    ),
    Producer(
        name="Hydrogen Now",
        description="Description for Montreal Producer 2",
        postal_code="H1A 0A2",
        latitude=45.5017,
        longitude=-73.5673,
        contract_type="Type B",
        contract_duration=24,
        dollars_per_kg=12.0,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1740541092/marker_egpvvm.png"
    ),
    Producer(
        name="Clean Power",
        description="Description for Montreal Producer 3",
        postal_code="H1A 0A3",
        latitude=45.5017,
        longitude=-73.5673,
        contract_type="Type C",
        contract_duration=36,
        dollars_per_kg=14.0,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1740541092/marker_egpvvm.png"
    ),
    Producer(
        name="GreenGaz",
        description="Description for Montreal Producer 4",
        postal_code="H1A 0A4",
        latitude=45.5017,
        longitude=-73.5673,
        contract_type="Type D",
        contract_duration=48,
        dollars_per_kg=16.0,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1740541092/marker_egpvvm.png"
    ),
    Producer(
        name="Future Energy",
        description="Description for Montreal Producer 5",
        postal_code="H1A 0A5",
        latitude=45.5017,
        longitude=-73.5673,
        contract_type="Type E",
        contract_duration=60,
        dollars_per_kg=18.0,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1740541092/marker_egpvvm.png"
    )
]

def init_db(app):
    with app.app_context():
        db.drop_all()
        db.create_all()

        db.session.add_all(producers)
        db.session.commit()

        print("Database initialized")
