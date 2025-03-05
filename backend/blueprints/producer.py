from flask import Blueprint, request
from database.model import Producer
from math import radians, sin, cos, sqrt, atan2, ceil
import pgeocode

producer = Blueprint('producer', __name__, url_prefix='/producer')

@producer.route('', methods=['GET'])
def get_producers():

    postal_code = request.args.get('postalcode')
    lat = request.args.get('lat')
    lon = request.args.get('lon')

    # Get all producers
    producers = Producer.query.all()

    if postal_code:

        # Get coordinates for the postal code
        pg = pgeocode.Nominatim('ca')
        postal_code_info = pg.query_postal_code(postal_code)

        if postal_code_info.empty:
            return {'error': 'Postal code not found.'}, 404
        
        lat = postal_code_info.latitude
        lon = postal_code_info.longitude

    if lat and lon:
        lat = float(lat)
        lon = float(lon)

        # Calculate distance to all producers
        for producer in producers:
            producer.lat = producer.latitude
            producer.lon = producer.longitude

            producer.distance = haversine(lat, lon, producer.lat, producer.lon)
    
    return  {
        'producers': [
            {
                'id': producer.id,
                'name': producer.name,
                'description': producer.description,
                'latitude': producer.latitude,
                'longitude': producer.longitude,
                'contract_duration': producer.contract_duration,
                'dollars_per_kg': producer.dollars_per_kg,
                'available_kg': producer.available_kg,
                'logo_url': producer.logo_url,
                'distance': producer.distance if hasattr(producer, 'distance') else None
            }
            for producer in producers
        ]
    }

def haversine(lat1, lon1, lat2, lon2):
    r = 6371  # Earth radius in kilometers
    phi1 = radians(lat1)
    phi2 = radians(lat2)
    delta_phi = radians(lat2 - lat1)
    delta_lambda = radians(lon2 - lon1)

    a = sin(delta_phi / 2)**2 + cos(phi1) * cos(phi2) * sin(delta_lambda / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return ceil(r * c)
