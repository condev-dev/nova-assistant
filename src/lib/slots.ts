import { and, eq, gte, lt } from 'drizzle-orm';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { business } from './config';

export const toInstant = (date: string, time: string) =>
  new Date(`${date}T${time}:00${business.tzOffset}`);

function addMinutes(time: string, m: number) {
  const [h, mi] = time.split(':').map(Number);
  const t = h * 60 + mi + m;
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
}

export function allSlots(date: string): string[] {
  const noon = new Date(`${date}T12:00:00${business.tzOffset}`);
  if (Number.isNaN(noon.getTime())) return [];
  if (!business.workDays.includes(noon.getUTCDay())) return [];
  const out: string[] = [];
  let t = business.open;
  while (addMinutes(t, business.slotMinutes) <= business.close) {
    out.push(t);
    t = addMinutes(t, business.slotMinutes);
  }
  return out;
}

export async function freeSlots(date: string): Promise<string[]> {
  const slots = allSlots(date);
  if (!slots.length) return [];
  const from = toInstant(date, '00:00');
  const to = new Date(from.getTime() + 86_400_000);
  const taken = await db
    .select({ startsAt: bookings.startsAt })
    .from(bookings)
    .where(and(eq(bookings.status, 'confirmed'), gte(bookings.startsAt, from), lt(bookings.startsAt, to)));
  const takenSet = new Set(taken.map((b) => b.startsAt.getTime()));
  const minTime = Date.now() + 30 * 60_000;
  return slots.filter((s) => {
    const t = toInstant(date, s).getTime();
    return t > minTime && !takenSet.has(t);
  });
}
