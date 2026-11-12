import { tool } from 'ai';
import { z } from 'zod';
import { and, eq, gt } from 'drizzle-orm';
import { db } from '@/db';
import { bookings, leads } from '@/db/schema';
import { business } from './config';
import { freeSlots, toInstant } from './slots';
import { notifyOwner } from './notify';

const normalizeDigits = (s: string) =>
  s
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

const normalizePhone = (raw: string) => {
  const p = normalizeDigits(raw).replace(/[\s\-()]/g, '');
  const m = p.match(/^(?:\+98|0098|98|0)?(9\d{9})$/);
  return m ? `0${m[1]}` : null;
};

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'format YYYY-MM-DD');
const timeSchema = z.string().regex(/^\d{2}:\d{2}$/, 'format HH:MM');

export function buildTools(ctx: { conversationId: string; channel: string }) {
  return {
    check_availability: tool({
      description: 'ساعت‌های خالی یک روز مشخص را برمی‌گرداند. تاریخ باید میلادی و به شکل YYYY-MM-DD باشد.',
      inputSchema: z.object({ date: dateSchema }),
      execute: async ({ date }) => ({ date, freeSlots: await freeSlots(date) }),
    }),

    book_appointment: tool({
      description:
        'یک نوبت را قطعی ثبت می‌کند. فقط بعد از اینکه کاربر نام، شماره موبایل، خدمت، تاریخ و ساعت را تأیید کرد صدا بزن.',
      inputSchema: z.object({
        name: z.string().min(2),
        phone: z.string(),
        service: z.string().describe(`یکی از: ${business.services.map((s) => s.id).join(', ')}`),
        date: dateSchema,
        time: timeSchema,
      }),
      execute: async ({ name, phone, service, date, time }) => {
        const p = normalizePhone(phone);
        if (!p) return { ok: false, error: 'شماره موبایل نامعتبر است' };
        const svc = business.services.find((s) => s.id === service);
        if (!svc) return { ok: false, error: 'خدمت نامعتبر', valid: business.services.map((s) => s.id) };

        const free = await freeSlots(date);
        if (!free.includes(time)) return { ok: false, error: 'این ساعت آزاد نیست', freeSlots: free };

        const [row] = await db
          .insert(bookings)
          .values({ conversationId: ctx.conversationId, name, phone: p, service: svc.title, startsAt: toInstant(date, time) })
          .onConflictDoNothing()
          .returning();
        if (!row) return { ok: false, error: 'همین الان توسط فرد دیگری رزرو شد', freeSlots: await freeSlots(date) };

        await db.insert(leads).values({
          conversationId: ctx.conversationId,
          channel: ctx.channel,
          name,
          phone: p,
          interest: svc.title,
        });
        await notifyOwner(`رزرو جدید\n${name} — ${p}\n${svc.title}\n${date} ساعت ${time}\nکانال: ${ctx.channel}`);
        return { ok: true, bookingId: row.id, date, time, service: svc.title };
      },
    }),

    cancel_booking: tool({
      description: 'نوبت آینده‌ی همین کاربر را با شماره موبایلش لغو می‌کند.',
      inputSchema: z.object({ phone: z.string() }),
      execute: async ({ phone }) => {
        const p = normalizePhone(phone);
        if (!p) return { ok: false, error: 'شماره نامعتبر' };
        const rows = await db
          .update(bookings)
          .set({ status: 'cancelled' })
          .where(
            and(
              eq(bookings.conversationId, ctx.conversationId),
              eq(bookings.phone, p),
              eq(bookings.status, 'confirmed'),
              gt(bookings.startsAt, new Date()),
            ),
          )
          .returning();
        if (!rows.length) return { ok: false, error: 'نوبت فعالی پیدا نشد' };
        await notifyOwner(`لغو نوبت\n${rows.map((r) => `${r.name} — ${r.startsAt.toISOString()}`).join('\n')}`);
        return { ok: true, cancelled: rows.length };
      },
    }),

    save_lead: tool({
      description: 'اطلاعات تماس کاربر علاقه‌مند را ذخیره می‌کند (وقتی هنوز رزرو نمی‌کند ولی شماره می‌دهد).',
      inputSchema: z.object({
        name: z.string().optional(),
        phone: z.string(),
        interest: z.string().optional(),
      }),
      execute: async ({ name, phone, interest }) => {
        const p = normalizePhone(phone);
        if (!p) return { ok: false, error: 'شماره نامعتبر' };
        await db.insert(leads).values({
          conversationId: ctx.conversationId,
          channel: ctx.channel,
          name: name ?? null,
          phone: p,
          interest: interest ?? null,
        });
        await notifyOwner(`سرنخ جدید\n${name ?? '-'} — ${p}\n${interest ?? '-'}\nکانال: ${ctx.channel}`);
        return { ok: true };
      },
    }),
  };
}
