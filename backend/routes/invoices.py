from flask import Blueprint, request, jsonify
from models import get_invoices
from routes.auth import token_required
from bson import ObjectId

invoices_bp = Blueprint('invoices', __name__)

@invoices_bp.route('/invoices', methods=['GET'])
@token_required
def list_invoices(user_id):
    invoices = list(get_invoices().find({'user_id': user_id}))
    for i in invoices:
        i['_id'] = str(i['_id'])
    return jsonify(invoices)

@invoices_bp.route('/invoices', methods=['POST'])
@token_required
def add_invoice(user_id):
    data = request.json
    invoice_id = get_invoices().insert_one({
        'user_id': user_id,
        'booking_id': data['booking_id'],
        'amount': data['amount'],
        'status': 'unpaid'
    }).inserted_id
    return jsonify({'_id': str(invoice_id)})