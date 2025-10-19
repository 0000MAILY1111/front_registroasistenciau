import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { botToken, chatId } = await request.json()

    if (!botToken || !chatId) {
      return NextResponse.json({ error: "Missing bot token or chat ID" }, { status: 400 })
    }

    // Send test message via Telegram Bot API
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: "✅ Prueba de conexión exitosa!\n\nEl sistema de notificaciones de AttendanceHub está funcionando correctamente.",
        parse_mode: "Markdown",
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json({ error: error.description || "Failed to send message" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Telegram test error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
