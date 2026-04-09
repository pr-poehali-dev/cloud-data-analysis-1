import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта ScootCraft на почту владельца"""
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    email = body.get("email", "").strip()
    message = body.get("message", "").strip()

    if not name or not email or not message:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Fill all fields"}, ensure_ascii=False),
        }

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    sender = "angeloricci131@gmail.com"
    recipient = "angeloricci131@gmail.com"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка с ScootCraft от {name}"
    msg["From"] = sender
    msg["To"] = recipient

    html = f"""
    <h2>Новая заявка с сайта ScootCraft</h2>
    <p><strong>Имя:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Сообщение:</strong><br>{message}</p>
    """

    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"success": True}),
    }