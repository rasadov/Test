from flask_login import UserMixin

from db import db, bcrypt, login_manager


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    ecart = db.relationship('ECart', backref='user', uselist=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    surname = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='user')

    def __init__(self, data):
        self.username = data.get("username")
        self.set_password(data.get("password"))
        self.name = data.get("name")
        self.surname = data.get("surname")
        self.phone = data.get("phone")

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, plain_password):
        return bcrypt.check_password_hash(self.password, plain_password)
    
    def is_admin(self):
        return self.role == 'admin'
    
    @staticmethod
    def user_exists(username):
        return db.Query(User).filter(User.username==username).count() > 0


class ECart(db.Model):
    __tablename__ = 'ecarts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    bonus = db.Column(db.Integer, nullable=False, default=5)

@login_manager.user_loader
def load_user(user_id):
    """
    Load a user from the database based on the user ID.

    Args:
      user_id (int): The ID of the user to load.

    Returns:
      User or None: The loaded user object if found, None otherwise.
    """
    try:
        return db.session.get(User, int(user_id))  # noqa: F405
    except (AttributeError, ValueError):
        return None
