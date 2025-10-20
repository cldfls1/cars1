import httpx
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import json
from typing import Optional

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")

async def send_email_notification(to_email: str, subject: str, body: str) -> bool:
    """Send email notification"""
    if not SMTP_USER or not SMTP_PASSWORD:
        print("Email credentials not configured")
        return False
    
    try:
        message = MIMEMultipart()
        message["From"] = SMTP_USER
        message["To"] = to_email
        message["Subject"] = subject
        
        message.attach(MIMEText(body, "html"))
        
        # Using sync smtplib in async context (for simplicity)
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(message)
        
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

async def send_telegram_notification(chat_id: str, message: str) -> bool:
    """Send Telegram notification"""
    if not TELEGRAM_BOT_TOKEN:
        print("Telegram bot token not configured")
        return False
    
    try:
        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        async with httpx.AsyncClient() as client:
            response = await client.post(
                url,
                json={
                    "chat_id": chat_id,
                    "text": message,
                    "parse_mode": "HTML"
                }
            )
            return response.status_code == 200
    except Exception as e:
        print(f"Error sending Telegram message: {e}")
        return False

async def send_push_notification(subscription: str, title: str, body: str) -> bool:
    """Send browser push notification (requires web-push library in production)"""
    # This is a placeholder. In production, you'd use pywebpush library
    # with VAPID keys for proper web push notifications
    try:
        subscription_data = json.loads(subscription)
        # Here you would use pywebpush.webpush() with proper VAPID keys
        print(f"Push notification would be sent: {title} - {body}")
        return True
    except Exception as e:
        print(f"Error sending push notification: {e}")
        return False

async def notify_user(
    user,
    title: str,
    message: str,
    notification_type: str = "system",
    deal_id: Optional[int] = None
) -> None:
    """Send notification to user through all enabled channels"""
    
    # Send email if enabled
    if user.notify_email and user.email:
        await send_email_notification(
            user.email,
            title,
            f"<h2>{title}</h2><p>{message}</p>"
        )
    
    # Send Telegram if enabled
    if user.notify_telegram and user.telegram_id:
        telegram_message = f"<b>{title}</b>\n\n{message}"
        await send_telegram_notification(user.telegram_id, telegram_message)
    
    # Send push notification if enabled
    if user.notify_push and user.push_subscription:
        await send_push_notification(user.push_subscription, title, message)
