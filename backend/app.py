from flask import Flask
from config import Config
from models import init_db
from routes.auth import auth_bp
from routes.services import services_bp
from routes.bookings import bookings_bp
from routes.invoices import invoices_bp
from routes.chatbot import chatbot_bp

app = Flask(__name__)
app.config.from_object(Config)
init_db(app)

app.register_blueprint(auth_bp)
app.register_blueprint(services_bp)
app.register_blueprint(bookings_bp)
app.register_blueprint(invoices_bp)
app.register_blueprint(chatbot_bp)

if __name__ == '__main__':
    app.run(debug=True)