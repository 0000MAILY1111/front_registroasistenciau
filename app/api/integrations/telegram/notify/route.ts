import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { botToken, chatId, message } = await request.json()

    if (!botToken || !chatId || !message) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json({ error: error.description || "Failed to send message" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Telegram notification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
