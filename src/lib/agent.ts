import { generateText, stepCountIs } from 'ai';
import { google } from '@ai-sdk/google';
import { and, count, desc, eq, gte } from 'drizzle-orm';
import { db } from '@/db';
import { conversations, messages } from '@/db/schema';
import { buildSystemPrompt } from './prompt';
import { buildTools } from './tools';

export type Channel = 'web' | 'telegram' | 'whatsapp';

const FALLBACK = 'یه لحظه مشکل فنی پیش اومد. لطفاً همین پیام را یک بار دیگر بفرستید.';

export async function runAgent(input: { channel: Channel; externalId: string; text: string }) {
  const { channel, externalId, text } = input;

  await db.insert(conversations).values({ channel, externalId }).onConflictDoNothing();
  const [conv] = await db
    .select()
    .from(conversations)
    .where(and(eq(conversations.channel, channel), eq(conversations.externalId, externalId)));

  const [{ n }] = await db
    .select({ n: count() })
    .from(messages)
    .where(
      and(
        eq(messages.conversationId, conv.id),
        eq(messages.role, 'user'),
        gte(messages.createdAt, new Date(Date.now() - 3_600_000)),
      ),
    );
  if (n >= 30) return 'پیام‌های زیادی در یک ساعت گذشته فرستاده شده. لطفاً کمی بعد دوباره امتحان کنید.';

  await db.insert(messages).values({ conversationId: conv.id, role: 'user', content: text });

  const rows = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, conv.id))
    .orderBy(desc(messages.id))
    .limit(20);
  const history = rows.reverse();
  while (history[0]?.role === 'assistant') history.shift();

  let reply = FALLBACK;
  try {
    const result = await generateText({
      model: google(process.env.GEMINI_MODEL ?? 'gemini-3-flash-preview'),
      system: buildSystemPrompt(),
      messages: history.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      tools: buildTools({ conversationId: conv.id, channel }),
      stopWhen: stepCountIs(6),
      temperature: 0.3,
    });
    reply = result.text.trim() || FALLBACK;
  } catch (e) {
    console.error('agent error', e);
    return FALLBACK;
  }

  await db.insert(messages).values({ conversationId: conv.id, role: 'assistant', content: reply });
  return reply;
}
