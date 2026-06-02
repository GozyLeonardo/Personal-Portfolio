/**
 * Lightweight Telegram notification — fire-and-forget.
 * Never throws, never blocks the user-facing response.
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function notifyTelegram(title: string, detail?: string): Promise<void> {
  if (!BOT_TOKEN || !CHAT_ID) return;

  const text = detail ? title + "\n\n" + detail : title;

  try {
    await fetch("https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
  } catch {
    // Swallow — notification failure must never break user flow
  }
}
