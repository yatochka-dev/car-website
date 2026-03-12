type TelegramResponse = {
  ok: boolean
  result?: unknown
  description?: string
}

export async function sendTelegramMessage(
  message: string,
  token: string,
  chatId: string | number,
): Promise<TelegramResponse> {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage?parse_mode=Markdown`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML', // optional: supports <b>, <i>, etc.
    }),
  })

  const data: TelegramResponse = await res.json()

  if (!res.ok || !data.ok) {
    throw new Error(`Telegram API error: ${data.description ?? 'Unknown error'}`)
  }

  return data
}
