from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from models import get_users
from utils.jwt_helper import encode_auth_token, decode_auth_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    users = get_users()
    if users.find_one({'email': data['email']}):
        return jsonify({'msg': 'Email already exists'}), 400
    user_id = users.insert_one({
        'email': data['email'],
        'password': generate_password_hash(data['password']),
        'role': data.get('role', 'customer'),
        'name': data.get('name', '')
    }).inserted_id
    token = encode_auth_token(str(user_id))
    return jsonify({'token': token})

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    users = get_users()
    user = users.find_one({'email': data['email']})
    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({'msg': 'Invalid credentials'}), 401
    token = encode_auth_token(str(user['_id']))
    return jsonify({'token': token, 'role': user['role'], 'name': user['name']})

def token_required(f):
    from functools import wraps
    def decorator(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'msg': 'Missing token'}), 403
        token = auth_header.split(' ')[1]
        user_id = decode_auth_token(token)
        if not user_id:
            return jsonify({'msg': 'Invalid token'}), 403
        return f(user_id, *args, **kwargs)
    return wraps(f)(decorator)