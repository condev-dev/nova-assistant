import Image from 'next/image';
import { desc } from 'drizzle-orm';
import { db } from '@/db';
import { bookings, leads } from '@/db/schema';

export const dynamic = 'force-dynamic';

const dateFormatter = new Intl.DateTimeFormat('fa-IR', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Asia/Tehran',
});

const channelLabel: Record<string, string> = {
  web: 'وب‌سایت',
  telegram: 'تلگرام',
  whatsapp: 'واتساپ',
};

export default async function AdminPage() {
  const [bookingRows, leadRows] = await Promise.all([
    db.select().from(bookings).orderBy(desc(bookings.createdAt)).limit(50),
    db.select().from(leads).orderBy(desc(leads.createdAt)).limit(50),
  ]);

  const confirmedCount = bookingRows.filter((booking) => booking.status === 'confirmed').length;

  return (
    <main dir="rtl" lang="fa" className="min-h-screen bg-[#f7fafc] text-[#0d2438]">
      <header className="border-b border-[#dbe6ee] bg-white">
        <div className="nava-shell flex min-h-[74px] flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0d2438] p-1">
              <Image src="/nova-symbol.png" alt="" width={40} height={40} className="h-full w-full object-cover" />
            </span>
            <div>
              <p className="text-sm font-black leading-5">نوا</p>
              <p className="text-[10px] font-bold text-[#60758a]">پنل دمو · پیگیری درخواست‌ها</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-[#e7f8f5] px-3 py-1.5 text-[10px] font-bold text-[#127c71] sm:inline-flex">
              نسخه نمایشی
            </span>
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3eee6] text-xs font-black">
              م
            </span>
          </div>
        </div>
      </header>

      <div className="nava-shell py-8 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="nava-kicker">داشبورد</p>
            <h1 className="mt-2 text-2xl font-black sm:text-3xl">نمونه درخواست‌ها</h1>
            <p className="mt-2 text-sm leading-6 text-[#5d7287]">
              اینجا می‌توانید نمونه رزروها و سرنخ‌هایی را ببینید که از کانال‌های نوا ثبت شده‌اند.
            </p>
          </div>
          <p className="rounded-lg border border-[#dbe6ee] bg-white px-3 py-2 text-[10px] font-bold text-[#738697]">
            آخرین ۵۰ مورد
          </p>
        </div>

        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#dbe6ee] bg-white p-5">
            <dt className="text-xs font-bold text-[#60758a]">رزرو قطعی</dt>
            <dd className="mt-2 text-3xl font-black">{confirmedCount}</dd>
            <p className="mt-1 text-[10px] text-[#22a99b]">از {bookingRows.length} رزرو ثبت‌شده</p>
          </div>
          <div className="rounded-2xl border border-[#dbe6ee] bg-white p-5">
            <dt className="text-xs font-bold text-[#60758a]">سرنخ‌ها</dt>
            <dd className="mt-2 text-3xl font-black">{leadRows.length}</dd>
            <p className="mt-1 text-[10px] text-[#738697]">از همه کانال‌ها</p>
          </div>
          <div className="rounded-2xl bg-[#0d2438] p-5 text-white">
            <dt className="text-xs font-bold text-white/60">وضعیت سامانه</dt>
            <dd className="mt-3 text-base font-black">آماده پاسخ‌گویی</dd>
            <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-[#7be1d5]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#7be1d5]" />
              دستیار فعال است
            </p>
          </div>
        </dl>

        <section aria-labelledby="bookings-title" className="mt-9">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 id="bookings-title" className="text-base font-black">نوبت‌ها</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#dbe6ee] bg-white">
            <table className="w-full min-w-[660px] text-right text-sm">
              <caption className="sr-only">فهرست نوبت‌های ثبت‌شده</caption>
              <thead className="bg-[#fbfdfe] text-[11px] text-[#60758a]">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold">نام</th>
                  <th scope="col" className="px-4 py-3 font-bold">موبایل</th>
                  <th scope="col" className="px-4 py-3 font-bold">خدمت</th>
                  <th scope="col" className="px-4 py-3 font-bold">زمان</th>
                  <th scope="col" className="px-4 py-3 font-bold">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {bookingRows.length > 0 ? (
                  bookingRows.map((booking) => (
                    <tr key={booking.id} className="border-t border-[#edf2f5]">
                      <td className="px-4 py-3.5 font-bold">{booking.name}</td>
                      <td className="ltr-data px-4 py-3.5 text-[#5d7287]">
                        <bdi dir="ltr">{booking.phone}</bdi>
                      </td>
                      <td className="px-4 py-3.5">{booking.service}</td>
                      <td className="px-4 py-3.5 text-[#5d7287]">{dateFormatter.format(booking.startsAt)}</td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black ${
                            booking.status === 'confirmed'
                              ? 'bg-[#e7f8f5] text-[#127c71]'
                              : 'bg-[#fff0ef] text-[#c2413b]'
                          }`}
                        >
                          {booking.status === 'confirmed' ? 'قطعی' : 'لغوشده'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-sm text-[#738697]">
                      هنوز نوبتی ثبت نشده است.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="leads-title" className="mt-9 pb-10">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 id="leads-title" className="text-base font-black">سرنخ‌ها</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#dbe6ee] bg-white">
            <table className="w-full min-w-[660px] text-right text-sm">
              <caption className="sr-only">فهرست سرنخ‌های ثبت‌شده</caption>
              <thead className="bg-[#fbfdfe] text-[11px] text-[#60758a]">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold">نام</th>
                  <th scope="col" className="px-4 py-3 font-bold">موبایل</th>
                  <th scope="col" className="px-4 py-3 font-bold">موضوع</th>
                  <th scope="col" className="px-4 py-3 font-bold">کانال</th>
                  <th scope="col" className="px-4 py-3 font-bold">تاریخ ثبت</th>
                </tr>
              </thead>
              <tbody>
                {leadRows.length > 0 ? (
                  leadRows.map((lead) => (
                    <tr key={lead.id} className="border-t border-[#edf2f5]">
                      <td className="px-4 py-3.5 font-bold">{lead.name ?? 'بدون نام'}</td>
                      <td className="ltr-data px-4 py-3.5 text-[#5d7287]">
                        <bdi dir="ltr">{lead.phone}</bdi>
                      </td>
                      <td className="px-4 py-3.5">{lead.interest ?? 'نیاز به بررسی'}</td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex rounded-full bg-[#f3eee6] px-2.5 py-1 text-[10px] font-black text-[#806a4d]">
                          {channelLabel[lead.channel] ?? lead.channel}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-[#5d7287]">{dateFormatter.format(lead.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-sm text-[#738697]">
                      هنوز سرنخی ثبت نشده است.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
