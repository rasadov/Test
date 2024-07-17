from os import environ as env

import cv2
import numpy as np
from flask import Blueprint, render_template, redirect, request
from flask_login import login_user, logout_user, current_user


from models import User, ECart
from db import db
from decorators import login_required, logout_required, admin_required
from utils import encode, decode

main = Blueprint('main', __name__)

@main.get("/")
def index():
    return render_template('index.html')

@main.get("/login")
@logout_required
def login():
    return render_template('login.html')

@main.post("/login")
@logout_required
def login_post():
    username = request.form.get("username")
    password_attempt = request.form.get("password")

    user = db.session.query(User).filter(User.username==username)

    if user.count() == 0:
        return "User not found"
    user = user.first()

    if not user.check_password(password_attempt):
        return "Wrong password or username"
    
    login_user(user)
    return redirect('/')
    

@main.get("/register")
@logout_required
def register():
    return render_template('register.html')

@main.post("/register")
@logout_required
def register_post():
    data = request.form
    
    if User.user_exists(data.get("username")):
        return "User already exists"
    
    user = User(data)
    ecart = ECart(user_id=user.id)
    user.ecart = ecart
    db.session.add(user)
    db.session.add(ecart)
    db.session.commit()
    login_user(user)
    return redirect('/')

@main.get("/profile")
@login_required
def profile():
    return render_template('profile.html',
                           qr_code=encode(f"{env.get('MY_URL')}/admin/scan/{current_user.username}"),
                           user=current_user,
                           ecart=current_user.ecart)

@main.get("/logout")
@login_required
def logout():
    logout_user()
    return redirect('/')

@main.get("/admin")
@admin_required
def admin():
    return render_template("admin.html", qr_code=encode("https://www.google.com"))

@main.get("/admin/scan")
@admin_required
def scan():
    return render_template("admin_scan.html")

@main.post("/admin/scan")
@admin_required
def scan_post():
    if 'file' not in request.files:
        return "No file part", 400
    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400
    if file:
        image = cv2.imdecode(np.fromstring(file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
        
        decoded_str = decode(image)
        if decoded_str:
            print(decoded_str)
            return redirect(decoded_str)
        else:
            return "No QR code found", 400
    return "An error occurred", 500

@main.get("/admin/scan/<string:username>")
@admin_required
def admin_user_details(username):
    user = db.session.query(User).filter(User.username==username).first()
    if not user:
        return "User not found", 404
    return render_template("detail.html", user=user)

@main.post("/admin/scan/<string:username>")
@admin_required
def admin_give_bonus(username):
    user = db.session.query(User).filter(User.username==username).first()
    if not user:
        return "User not found", 404
    user.ecart.bonus += 1
    db.session.commit()
    return redirect(f"/admin/scan/{username}")

@main.get("/admin/users")
@admin_required
def users():
    users = db.Query(User).all()
    return render_template("users.html", users=users)

@main.get("/admin/users/<int:user_id>")
@admin_required
def user_details(user_id):
    user = db.session.query(User).get(user_id)
    if not user:
        return "User not found", 404
    return render_template("detail.html", user=user)

@main.get("/admin/users/edit/<int:user_id>")
@admin_required
def edit_get(user_id):
    user = db.session.query(User).get(user_id)
    if not user:
        return "User not found", 404
    return render_template("edit.html", user=user)

@main.post("/admin/users/edit/<int:user_id>")
@admin_required
def edit_post(user_id):
    user = db.session.query(User).get(user_id)
    if not user:
        return "User not found", 404
    data = request.form
    user.username = data.get("username")
    user.name = data.get("name")
    user.surname = data.get("surname")
    user.phone = data.get("phone")
    user.role = data.get("role")
    db.session.commit()
    return redirect(f"/admin/users/{user_id}")

@main.post("/admin/users/delete/<int:user_id>")
def delete(user_id):
    user = db.session.query(User).get(user_id)
    if not user:
        return "User not found", 404
    db.session.delete(user)
    db.session.commit()
    return redirect("/admin/users")