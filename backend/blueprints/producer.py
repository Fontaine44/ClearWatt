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
                'description': producer.description,
                'postal_code': producer.postal_code,
                'latitude': producer.latitude,
                'longitude': producer.longitude,
                'contract_type': producer.contract_type,
                'contract_duration': producer.contract_duration,
                'dollars_per_kg': producer.dollars_per_kg,
                'available_kg': producer.available_kg,
                'logo_url': producer.logo_url
            }
            for producer in producers
        ]
    }
