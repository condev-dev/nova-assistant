import { after } from 'next/server';
import { db } from '@/db';
import { processedEvents } from '@/db/schema';
import { runAgent } from '@/lib/agent';
import { sendTelegram, sendTyping } from '@/lib/notify';

export const maxDuration = 60;

export async function POST(req: Request) {
  if (req.headers.get('x-telegram-bot-api-secret-token') !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return new Response('forbidden', { status: 403 });
  }

  const update = await req.json();
  const msg = update.message;
  if (!msg?.text || msg.chat?.type !== 'private') return Response.json({ ok: true });

  const inserted = await db
    .insert(processedEvents)
    .values({ id: `tg:${update.update_id}` })
    .onConflictDoNothing()
    .returning();
  if (!inserted.length) return Response.json({ ok: true });

  const chatId = msg.chat.id as number;
  const text = msg.text === '/start' ? 'سلام' : (msg.text as string).slice(0, 1000);

  after(async () => {
    try {
      await sendTyping(chatId);
      const reply = await runAgent({ channel: 'telegram', externalId: String(chatId), text });
      await sendTelegram(chatId, reply);
    } catch (e) {
      console.error(e);
      await sendTelegram(chatId, 'مشکلی پیش اومد، لطفاً دوباره تلاش کنید.');
    }
  });

  return Response.json({ ok: true });
}
