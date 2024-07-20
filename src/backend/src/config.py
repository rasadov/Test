from os import environ as env

from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, supports_credentials=True, allow_headers='*', origins='*')
load_dotenv()

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_SUPPORTS_CREDENTIALS'] = True

SQLALCHEMY_DATABASE_URI = f'postgresql://{env.get("DB_USER")}:{env.get("DB_PASS")}@{env.get("DB_HOST")}:{env.get("DB_PORT")}/{env.get("DB_NAME")}'

app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = env.get('SECRET_KEY')
