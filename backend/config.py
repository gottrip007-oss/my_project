import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'super-secret-key')
    MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/ai_smart_service')
    AI_API_KEY = os.environ.get('AI_API_KEY', 'your-openai-key')