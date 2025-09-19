from flask import Blueprint, request, jsonify
from models import get_services
from routes.auth import token_required
from bson import ObjectId

services_bp = Blueprint('services', __name__)

@services_bp.route('/services', methods=['GET'])
@token_required
def list_services(user_id):
    services = list(get_services().find({'owner': user_id}))
    for s in services:
        s['_id'] = str(s['_id'])
    return jsonify(services)

@services_bp.route('/services', methods=['POST'])
@token_required
def add_service(user_id):
    data = request.json
    service_id = get_services().insert_one({
        'name': data['name'],
        'price': data['price'],
        'desc': data.get('desc', ''),
        'owner': user_id
    }).inserted_id
    return jsonify({'_id': str(service_id)})

@services_bp.route('/services/<sid>', methods=['PUT'])
@token_required
def edit_service(user_id, sid):
    data = request.json
    get_services().update_one(
        {'_id': ObjectId(sid), 'owner': user_id},
        {'$set': {'name': data['name'], 'price': data['price'], 'desc': data.get('desc', '')}}
    )
    return jsonify({'msg': 'Service updated'})

@services_bp.route('/services/<sid>', methods=['DELETE'])
@token_required
def delete_service(user_id, sid):
    get_services().delete_one({'_id': ObjectId(sid), 'owner': user_id})
    return jsonify({'msg': 'Service deleted'})