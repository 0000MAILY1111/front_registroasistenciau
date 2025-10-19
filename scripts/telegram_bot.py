"""
Telegram Bot for Attendance Notifications
This bot sends automated notifications about student absences.
"""

import os
import json
import asyncio
from telegram import Bot
from telegram.error import TelegramError

class AttendanceBot:
    def __init__(self, bot_token, chat_id):
        self.bot = Bot(token=bot_token)
        self.chat_id = chat_id
    
    async def send_absence_notification(self, student_name, subject, date):
        """Send notification about student absence"""
        message = f"""
🚨 *Notificación de Ausencia*

👤 Estudiante: {student_name}
📚 Materia: {subject}
📅 Fecha: {date}

El estudiante ha sido marcado como ausente.
        """
        
        try:
            await self.bot.send_message(
                chat_id=self.chat_id,
                text=message,
                parse_mode='Markdown'
            )
            return True
        except TelegramError as e:
            print(f"Error sending message: {e}")
            return False
    
    async def send_daily_summary(self, summary_data):
        """Send daily attendance summary"""
        message = f"""
📊 *Resumen Diario de Asistencia*

📅 Fecha: {summary_data['date']}

✅ Presentes: {summary_data['present']}
❌ Ausentes: {summary_data['absent']}
⏰ Tardanzas: {summary_data['late']}
📝 Justificados: {summary_data['excused']}

📈 Tasa de asistencia: {summary_data['attendance_rate']}%
        """
        
        try:
            await self.bot.send_message(
                chat_id=self.chat_id,
                text=message,
                parse_mode='Markdown'
            )
            return True
        except TelegramError as e:
            print(f"Error sending message: {e}")
            return False

async def main():
    """Main function for testing"""
    bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
    chat_id = os.getenv('TELEGRAM_CHAT_ID')
    
    if not bot_token or not chat_id:
        print("Error: Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables")
        return
    
    bot = AttendanceBot(bot_token, chat_id)
    
    # Test notification
    await bot.send_absence_notification(
        "Juan Pérez",
        "Matemáticas II",
        "18/10/2025"
    )

if __name__ == "__main__":
    asyncio.run(main())
