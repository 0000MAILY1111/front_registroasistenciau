"""
Email Sender for Attendance Reports
This script sends attendance reports and notifications via email.
"""

import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from datetime import datetime

class EmailSender:
    def __init__(self, smtp_host, smtp_port, smtp_user, smtp_password):
        self.smtp_host = smtp_host
        self.smtp_port = smtp_port
        self.smtp_user = smtp_user
        self.smtp_password = smtp_password
    
    def send_email(self, to_email, subject, body, attachment_path=None):
        """Send email with optional PDF attachment"""
        try:
            # Create message
            msg = MIMEMultipart()
            msg['From'] = self.smtp_user
            msg['To'] = to_email
            msg['Subject'] = subject
            
            # Add body
            msg.attach(MIMEText(body, 'html'))
            
            # Add attachment if provided
            if attachment_path and os.path.exists(attachment_path):
                with open(attachment_path, 'rb') as f:
                    attachment = MIMEApplication(f.read(), _subtype='pdf')
                    attachment.add_header(
                        'Content-Disposition',
                        'attachment',
                        filename=os.path.basename(attachment_path)
                    )
                    msg.attach(attachment)
            
            # Send email
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(msg)
            
            return True
        except Exception as e:
            print(f"Error sending email: {e}")
            return False
    
    def send_attendance_report(self, to_email, student_name, report_path):
        """Send attendance report to student"""
        subject = f"Reporte de Asistencia - {student_name}"
        body = f"""
        <html>
        <body>
            <h2>Reporte de Asistencia</h2>
            <p>Estimado/a {student_name},</p>
            <p>Adjunto encontrarás tu reporte de asistencia actualizado.</p>
            <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
            <br>
            <p>Saludos cordiales,<br>
            Sistema de Control de Asistencia</p>
        </body>
        </html>
        """
        
        return self.send_email(to_email, subject, body, report_path)
    
    def send_absence_alert(self, to_email, student_name, subject_name, date):
        """Send absence alert to student or parent"""
        subject_line = f"Alerta de Ausencia - {student_name}"
        body = f"""
        <html>
        <body>
            <h2>Notificación de Ausencia</h2>
            <p>Estimado/a,</p>
            <p>Le informamos que el estudiante <strong>{student_name}</strong> ha sido marcado como ausente en la materia <strong>{subject_name}</strong> el día <strong>{date}</strong>.</p>
            <p>Si esta ausencia fue justificada, por favor contacte con la administración.</p>
            <br>
            <p>Saludos cordiales,<br>
            Sistema de Control de Asistencia</p>
        </body>
        </html>
        """
        
        return self.send_email(to_email, subject_line, body)

def main():
    """Main function for testing"""
    smtp_host = os.getenv('SMTP_HOST', 'smtp.gmail.com')
    smtp_port = int(os.getenv('SMTP_PORT', '587'))
    smtp_user = os.getenv('SMTP_USER')
    smtp_password = os.getenv('SMTP_PASSWORD')
    
    if not smtp_user or not smtp_password:
        print("Error: Missing SMTP_USER or SMTP_PASSWORD environment variables")
        return
    
    sender = EmailSender(smtp_host, smtp_port, smtp_user, smtp_password)
    
    # Test email
    sender.send_absence_alert(
        "test@example.com",
        "Juan Pérez",
        "Matemáticas II",
        datetime.now().strftime("%d/%m/%Y")
    )

if __name__ == "__main__":
    main()
