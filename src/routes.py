import cv2
import numpy as np
from qreader import QReader
from flask import Blueprint, render_template, redirect, request
from flask_login import login_user, logout_user, current_user
import segno

from models import User
from db import db
from decorators import login_required, logout_required, admin_required

main = Blueprint('main', __name__)

qreader = QReader()

def decode(image):
    return qreader.detect_and_decode(image)

def encode(data):
    qr_code = segno.make(data)
    qr_code_data_uri = qr_code.png_data_uri(scale=5)
    return qr_code_data_uri

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

    user = db.Query(User).filter(User.username==username)

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

    db.session.add(user)
    db.session.commit()
    login_user(user)
    return redirect('/')

@main.get("/profile")
@login_required
def profile():
    return render_template('profile.html', qr_code=encode(current_user.username))

@main.get("/logout")
@login_required
def logout():
    logout_user()
    return redirect('/')

@main.get("/admin")
# @admin_required
def admin():
    return render_template("admin.html", qr_code=encode("https://www.google.com"))

@main.get("/admin/scan")
# @admin_required
def scan():
    return render_template("admin_scan.html")

@main.post("/admin/scan")
# @admin_required
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
            return "Successfully scanned", 200
        else:
            return "No QR code found", 400
    return "An error occurred", 500

@main.get("/admin/users")
# @admin_required
def users():
    users = db.Query(User).all()
    return render_template("users.html", users=users)