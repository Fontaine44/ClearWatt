from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)

    from database.model import db
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
    db.init_app(app)

    from database.init_db import init_db
    init_db(app)

    from blueprints.producer import producer
    app.register_blueprint(producer)

    @app.route('/')
    def health():
        return ''

    return app
