from os import environ as env

import cv2
import numpy as np
from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, current_user
from flask_cors import cross_origin, CORS

from models import User, ECart
from db import db
from decorators import login_required, logout_required, admin_required
from utils import encode, decode

main = Blueprint('main', __name__)


CORS(main, supports_credentials=True)

@main.post("/login")
@logout_required
def login_post():
    data = request.get_json()
    username = data.get("username")
    password_attempt = data.get("password")

    user = db.session.query(User).filter(User.username==username)

    if user.count() == 0:
        return jsonify({"error": "User not found"}), 404
    user = user.first()

    if not user.check_password(password_attempt):
        return jsonify({"error": "Wrong password"}), 400
    
    login_user(user)
    return jsonify({"user": user.to_dict()}), 200

@main.post("/register")
@logout_required
def register_post():
    data = request.get_json()
    print(data)
    if User.user_exists(data.get("username")):
        return jsonify({"error": "User already exists"}), 400
    
    user = User(data)
    ecart = ECart(user_id=user.id)
    user.ecart = ecart
    db.session.add(user)
    db.session.add(ecart)
    db.session.commit()
    login_user(user)
    return jsonify({"user": user.to_dict()}), 200

@main.get("/profile")
@login_required
def profile():
    return jsonify({"user": current_user.to_dict(), 
                    "ecart": current_user.ecart.to_dict(),
                    "qr_code": encode(f"{env.get('MY_URL')}/admin/scan/{current_user.username}")
                    }), 200

@main.get("/logout")
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out"}), 200

@main.post("/admin/scan")
@admin_required
def scan_post():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        image = cv2.imdecode(np.fromstring(file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
        
        decoded_str = decode(image)
        if decoded_str:
            return jsonify({"decoded_str": decoded_str}), 200
        else:
            return jsonify({"error": "QR code not found"}), 404
    return jsonify({"error": "Something went wrong"}), 500

@main.post("/admin/scan/<string:username>")
@admin_required
def admin_give_bonus(username):
    user = db.session.query(User).filter(User.username==username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    user.ecart.bonus += 1
    db.session.commit()
    return jsonify({"message": "Bonus given"}), 200

@main.get("/admin/users")
@admin_required
def users():
    users = db.Query(User).all()
    return jsonify({"users": [user.to_dict() for user in users]}), 200

@main.get("/admin/users/<int:user_id>")
@admin_required
def user_details(user_id):
    print(current_user.role)
    user = db.session.query(User).get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({
        "user": user.to_dict(),
        "ecart": user.ecart.to_dict()}), 200

@main.get("/admin/users/edit/<int:user_id>")
@admin_required
def edit_get(user_id):
    user = db.session.query(User).get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"user": user.to_dict()}), 200

@main.post("/admin/users/edit/<int:user_id>")
@admin_required
def edit_post(user_id):
    user = db.session.query(User).get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    data = request.form
    user.username = data.get("username")
    user.name = data.get("name")
    user.surname = data.get("surname")
    user.phone = data.get("phone")
    user.role = data.get("role")
    db.session.commit()
    return jsonify({"user": user.to_dict()}), 200

@main.post("/admin/users/delete/<int:user_id>")
def delete(user_id):
    user = db.session.query(User).get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200
