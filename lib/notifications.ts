/**
 * Notification utilities for sending alerts via Telegram and Email
 */

export async function sendTelegramNotification(message: string) {
  const settings = JSON.parse(localStorage.getItem("integrationSettings") || "{}")
  const { telegram } = settings

  if (!telegram?.enabled || !telegram?.botToken || !telegram?.chatId) {
    console.warn("Telegram notifications not configured")
    return false
  }

  try {
    const response = await fetch("/api/integrations/telegram/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        botToken: telegram.botToken,
        chatId: telegram.chatId,
        message,
      }),
    })

    return response.ok
  } catch (error) {
    console.error("Failed to send Telegram notification:", error)
    return false
  }
}

export async function sendEmailNotification(to: string, subject: string, body: string) {
  const settings = JSON.parse(localStorage.getItem("integrationSettings") || "{}")
  const { email } = settings

  if (!email?.enabled) {
    console.warn("Email notifications not configured")
    return false
  }

  try {
    const response = await fetch("/api/integrations/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to,
        subject,
        body,
        smtpConfig: email,
      }),
    })

    return response.ok
  } catch (error) {
    console.error("Failed to send email notification:", error)
    return false
  }
}

export function formatAbsenceNotification(studentName: string, subject: string, date: string): string {
  return `🚨 *Notificación de Ausencia*\n\n👤 Estudiante: ${studentName}\n📚 Materia: ${subject}\n📅 Fecha: ${date}\n\nEl estudiante ha sido marcado como ausente.`
}
