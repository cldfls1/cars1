import jwt
from datetime import datetime, timedelta
import os
import hashlib
import secrets

SECRET_KEY = os.getenv("JWT_SECRET", "your-secret-key-change-in-production")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_HOURS = int(os.getenv("JWT_EXPIRATION_HOURS", "24"))

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password using SHA256 with salt"""
    try:
        salt = hashed_password[:32]
        stored_hash = hashed_password[32:]
        password_hash = hashlib.sha256((salt + plain_password).encode()).hexdigest()
        return password_hash == stored_hash
    except:
        return False

def get_password_hash(password: str) -> str:
    """Hash password using SHA256 with random salt"""
    salt = secrets.token_hex(16)  # 32 character salt
    password_hash = hashlib.sha256((salt + password).encode()).hexdigest()
    return salt + password_hash

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.InvalidTokenError:
        return None
