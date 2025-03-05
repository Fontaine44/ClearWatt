from database.model import db, Producer

producers = [
    Producer(
        name="Clean Energy",
        description="Clean Energy specializes in generating clean hydrogen using renewable energy sources. Their hydrogen is designed to meet the energy needs of both industrial and residential customers.",
        latitude=45.4384,
        longitude=-71.9009,
        contract_duration=6,
        dollars_per_kg=15.5,
        available_kg=3000,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1741148584/logo16_ey50fh.png"
    ),
    Producer(
        name="GreenH2 Quebec",
        description="GreenH2 Quebec focuses on producing clean hydrogen from wind energy, providing sustainable fuel for the transport sector.",
        latitude=46.8041,
        longitude=-71.2988,
        dollars_per_kg=13.0,
        available_kg=2500,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1741148545/logo10_ly8ysp.webp"
    ),
    Producer(
        name="GénieHydro",
        description="GénieHydro produces hydrogen from hydroelectricity, offering clean energy solutions to industries looking to reduce their carbon footprint. Their hydrogen is used in a variety of applications, including fuel cells and energy storage.",
        latitude=46.2625,
        longitude=-72.944749,
        contract_duration=5,
        dollars_per_kg=14.0,
        available_kg=5000,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1741148543/logo8_qvkuax.jpg"
    ),
    Producer(
        name="H2-Mtl",
        description="H2-Mtl specialized in the distributon of clean hydrogen produced from renewable energy sources. Their hydrogen is used in a variety of applications, including transportation and energy storage.",
        latitude=45.6366,
        longitude=-73.5195,
        contract_duration=9,
        dollars_per_kg=16.0,
        available_kg=2200,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1741148539/logo2_e3ikzs.png"
    ),
    Producer(
        name="Hydro Energy Solutions",
        description="Hydro Energy Solutions specializes in producing hydrogen from hydropower and offers competitive rates for clean energy solutions.",
        latitude=45.3265,
        longitude=-73.2942,
        contract_duration=2,
        dollars_per_kg=19.5,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1741148541/logo6_rnkqnj.png"
    ),
    Producer(
        name="H2Revolution",
        description="H2Revolution is committed to leading the charge towards a green economy by producing hydrogen from Quebec's vast wind energy resources.",
        latitude=45.3448,
        longitude=-73.6818,
        contract_duration=4,
        dollars_per_kg=14.5,
        available_kg=3500,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1741148537/logo1_fwae6n.png"
    ),
    Producer(
        name="EcoHydrogen Québec",
        description="EcoHydrogen Québec produces clean hydrogen, and creates innovative solutions for businesses and individuals who want to lower their environmental impact.",
        latitude=45.4240,
        longitude=-73.9679,
        contract_duration=1,
        dollars_per_kg=25.0,
        available_kg=1200,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1741148540/logo4_u4sgeo.png"
    ),
    Producer(
        name="Nikola",
        description="Nikola is dedicated to delivering affordable, clean hydrogen to Quebec's manufacturing sector through a combination of renewable energy sources.",
        latitude=45.4432,
        longitude=-73.6203,
        contract_duration=7,
        dollars_per_kg=13.5,
        available_kg=4000,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1741148551/logo15_fsj5h6.png"
    ),
    Producer(
        name="HydroGreen",
        description="HydroGreen utilizes revolutionnary methods to generate clean hydrogen, serving a wide range of commercial and industrial clients.",
        latitude=45.7864,
        longitude=-74.0326,
        contract_duration=3,
        dollars_per_kg=14.8,
        available_kg=1900,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1741148547/logo12_tiwqh5.png"
    ),
    Producer(
        name="Aurora Hydrogen",
        description="Aurora Hydrogen focuses on generating clean hydrogen and exports it all around Canada. They provide an eco-friendly solution for the future of transportation.",
        latitude=45.7517,
        longitude=-73.6341,
        contract_duration=8,
        dollars_per_kg=12.0,
        available_kg=2700,
        logo_url="https://res.cloudinary.com/dodu3btfh/image/upload/v1741148536/logo19_pojeeg.png"
    )

]

# logo_urls = [


def init_db(app):
    with app.app_context():
        db.drop_all()
        db.create_all()

        db.session.add_all(producers)
        db.session.commit()

        print("Database initialized")
