from flask_pymongo import PyMongo

mongo = PyMongo()

def init_db(app):
    mongo.init_app(app)

def get_users():
    return mongo.db.users

def get_services():
    return mongo.db.services

def get_bookings():
    return mongo.db.bookings

def get_invoices():
    return mongo.db.invoices