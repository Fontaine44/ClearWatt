from flask import Blueprint
from database.model import Producer

producer = Blueprint('producer', __name__, url_prefix='/producer')

@producer.route('/', methods=['GET'])
def get_producers():
    producers = Producer.query.all()
    
    return  {
        'producers': [
            {
                'id': producer.id,
                'name': producer.name,
                'location': producer.location
            }
            for producer in producers
        ]
    }
