const ensureEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing ${key}`);
  }
  return value;
};

export async function GET() {
  const token = ensureEnv("TELEGRAM_BOT_TOKEN");
  const siteUrl = ensureEnv("NEXT_PUBLIC_SITE_URL");
  const secret = ensureEnv("TELEGRAM_WEBHOOK_SECRET");

  const url = `https://api.telegram.org/bot${token}/setWebhook`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: `${siteUrl}/api/telegram/webhook`,
      secret_token: secret,
      allowed_updates: ["message", "callback_query"],
    }),
  });

  const data = await res.json();
  return Response.json(data);
}
