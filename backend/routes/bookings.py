from flask import Blueprint, request, jsonify
from models import get_bookings
from routes.auth import token_required
from bson import ObjectId

bookings_bp = Blueprint('bookings', __name__)

@bookings_bp.route('/bookings', methods=['GET'])
@token_required
def list_bookings(user_id):
    bookings = list(get_bookings().find({'user_id': user_id}))
    for b in bookings:
        b['_id'] = str(b['_id'])
    return jsonify(bookings)

@bookings_bp.route('/bookings', methods=['POST'])
@token_required
def add_booking(user_id):
    data = request.json
    booking_id = get_bookings().insert_one({
        'user_id': user_id,
        'service_id': data['service_id'],
        'datetime': data['datetime'],
        'status': 'pending'
    }).inserted_id
    return jsonify({'_id': str(booking_id)})