from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from dotenv import load_dotenv, dotenv_values

from routes import main


app = Flask(__name__)

load_dotenv()

env = dotenv_values('.env')

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{env.get("DB_USER")}:{env.get("DB_PASS")}@{env.get("DB_HOST")}:{env.get("DB_PORT")}/{env.get("DB_NAME")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = env.get('SECRET_KEY')

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
bcrypt = Bcrypt(app)

app.register_blueprint(main)