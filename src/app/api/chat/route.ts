import { z } from 'zod';
import { runAgent } from '@/lib/agent';

export const maxDuration = 60;

const schema = z.object({
  sessionId: z.string().uuid(),
  message: z.string().trim().min(1).max(1000),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: 'bad_request' }, { status: 400 });

  try {
    const reply = await runAgent({
      channel: 'web',
      externalId: parsed.data.sessionId,
      text: parsed.data.message,
    });
    return Response.json({ reply });
  } catch (error) {
    console.error('chat route error', error);
    return Response.json(
      { reply: 'ارتباط با سامانه برقرار نشد. لطفاً چند لحظه دیگر دوباره امتحان کنید.' },
      { status: 503 },
    );
  }
}
