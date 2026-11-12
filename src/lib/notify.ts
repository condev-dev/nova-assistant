const api = (method: string) =>
  `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${method}`;

async function tg(method: string, body: unknown) {
  const res = await fetch(api(method), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) console.error('telegram error', method, await res.text());
}

export const sendTelegram = (chatId: string | number, text: string) =>
  tg('sendMessage', { chat_id: chatId, text });

export const sendTyping = (chatId: string | number) =>
  tg('sendChatAction', { chat_id: chatId, action: 'typing' });

export async function notifyOwner(text: string) {
  const id = process.env.OWNER_TELEGRAM_CHAT_ID;
  if (!id) return;
  try {
    await sendTelegram(id, text);
  } catch (e) {
    console.error('notifyOwner failed', e);
  }
}

export async function sendWhatsApp(to: string, text: string) {
  const res = await fetch(
    `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body: text } }),
    },
  );
  if (!res.ok) console.error('whatsapp error', await res.text());
}
