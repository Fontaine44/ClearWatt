from database.model import db, Producer

producers = [
    Producer(
        name="HydroGreen",
        description="Description for Montreal Producer 1",
        postal_code="H1A 0A1",
        latitude=45.7119,
        longitude=-73.5673,
        contract_type="PPA",
        contract_duration=12,
        dollars_per_kg=10.0,
        available_kg=1000,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1740541092/marker_egpvvm.png"
    ),
    Producer(
        name="Hydrogen Now",
        description="Description for Montreal Producer 2",
        postal_code="H1A 0A2",
        latitude=45.5097,
        longitude=-73.5363,
        contract_type="Direct Purchase",
        contract_duration=24,
        dollars_per_kg=12.0,
        available_kg=2000,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1740541092/marker_egpvvm.png"
    ),
    Producer(
        name="Clean Power",
        description="Description for Montreal Producer 3",
        postal_code="H1A 0A3",
        latitude=45.4127,
        longitude=-73.3876,
        contract_type="PPA",
        contract_duration=36,
        dollars_per_kg=14.0,
        available_kg=3000,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1740541092/marker_egpvvm.png"
    ),
    Producer(
        name="GreenGaz",
        description="Description for Montreal Producer 4",
        postal_code="H1A 0A4",
        latitude=45.5728,
        longitude=-73.5630,
        contract_type="PPA",
        contract_duration=48,
        dollars_per_kg=16.0,
        available_kg=3500,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1740541092/marker_egpvvm.png"
    ),
    Producer(
        name="Future Energy",
        description="Description for Montreal Producer 5",
        postal_code="H1A 0A5",
        latitude=45.5101,
        longitude=-73.7605,
        contract_type="Direct Purchase",
        contract_duration=60,
        dollars_per_kg=18.0,
        available_kg=15000,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1740541092/marker_egpvvm.png"
    ),
    Producer(
        name="EcoPower",
        description="Description for Montreal Producer 6",
        postal_code="H1A 0A6",
        latitude=45.4800,
        longitude=-73.4850,
        contract_type="Direct Purchase",
        contract_duration=72,
        dollars_per_kg=20.0,
        available_kg=2200,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1740541092/marker_egpvvm.png"
    ),
    Producer(
        name="Renewable Source",
        description="Description for Montreal Producer 7",
        postal_code="H1A 0A7",
        latitude=45.6100,
        longitude=-73.6300,
        contract_type="PPA",
        contract_duration=84,
        dollars_per_kg=22.0,
        available_kg=5000,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1740541092/marker_egpvvm.png"
    ),
    Producer(
        name="Pure Energy",
        description="Description for Montreal Producer 8",
        postal_code="H1A 0A8",
        latitude=45.5430,
        longitude=-73.5970,
        contract_type="PPA",
        contract_duration=96,
        dollars_per_kg=24.0,
        available_kg=10750,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1740541092/marker_egpvvm.png"
    ),
    Producer(
        name="GreenTech",
        description="Description for Montreal Producer 9",
        postal_code="H1A 0A9",
        latitude=45.5921,
        longitude=-73.5270,
        contract_type="Direct Purchase",
        contract_duration=108,
        dollars_per_kg=26.0,
        available_kg=3750,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1740541092/marker_egpvvm.png"
    ),
    Producer(
        name="Sustainable Power",
        description="Description for Montreal Producer 10",
        postal_code="H1A 0B0",
        latitude=45.5818,
        longitude=-73.5859,
        contract_type="Direct Purchase",
        contract_duration=120,
        dollars_per_kg=28.0,
        available_kg=8000,
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
