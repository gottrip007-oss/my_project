from flask import Blueprint, request, jsonify
import openai
from config import Config

chatbot_bp = Blueprint('chatbot', __name__)
openai.api_key = Config.AI_API_KEY

@chatbot_bp.route('/chatbot', methods=['POST'])
def chatbot():
    user_message = request.json.get('message')
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": user_message}]
    )
    reply = response.choices[0].message['content']
    return jsonify({'response': reply})