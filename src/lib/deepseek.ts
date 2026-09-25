export const DEEPSEEK_CHAT_MODEL = "deepseek-chat";

const API_URL = "https://api.deepseek.com/chat/completions";

export interface DeepSeekMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface DeepSeekOptions {
  messages: DeepSeekMessage[];
  maxTokens?: number;
  temperature?: number;
  jsonMode?: boolean;
}

/** Minimal OpenAI-compatible client for DeepSeek (deepseek-chat). */
export async function deepseekChat(opts: DeepSeekOptions): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("DEEPSEEK_API_KEY is not configured");

  const body: Record<string, unknown> = {
    model: DEEPSEEK_CHAT_MODEL,
    messages: opts.messages,
    max_tokens: opts.maxTokens ?? 1024,
    stream: false,
  };
  if (opts.temperature !== undefined) body.temperature = opts.temperature;
  if (opts.jsonMode) body.response_format = { type: "json_object" };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`DeepSeek error (${res.status}) ${detail.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content ?? "";
}
