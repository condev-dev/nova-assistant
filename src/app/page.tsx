import Image from 'next/image';
import ChatWidget from '@/components/ChatWidget';
import { business } from '@/lib/config';

const steps = [
  {
    number: '۰۱',
    title: 'اول گوش می‌دهیم',
    text: 'قبل از هر پیشنهادی، با تیم شما می‌نشینیم و می‌فهمیم واقعاً کجا کار گره خورده است.',
  },
  {
    number: '۰۲',
    title: 'مسیر را می‌چینیم',
    text: 'قدم‌ها را طوری می‌چینیم که به توان تیم شما بخورد؛ نه اینکه فقط روی کاغذ قشنگ باشد.',
  },
  {
    number: '۰۳',
    title: 'تا اجرا همراهی می‌کنیم',
    text: 'کار را با یک نتیجه مشخص شروع می‌کنیم و تا وقتی تیم‌تان روی پای خودش بایستد، همراهش می‌مانیم.',
  },
];

export default function Home() {
  return (
    <main id="main" className="min-h-screen overflow-hidden">
      <a
        href="#contact"
        className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#0d2438]"
      >
        رفتن به فرم گفت‌وگو
      </a>

      <div className="border-b border-white/10 bg-[#0d2438] px-4 py-2 text-center text-[11px] text-white/70">
        نسخه نمایشی محصول · یک نمونه واقعی از دستیار مشاوره و رزرو
      </div>

      <header className="nava-glass sticky top-0 z-20 border-b border-[#dbe6ee]/80">
        <div className="nava-shell flex h-[76px] items-center justify-between gap-6">
          <a href="#top" className="flex shrink-0 items-center gap-3" aria-label="نوا، صفحه اصلی">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-[#0d2438] p-1">
              <Image src="/nova-symbol.png" alt="" width={44} height={44} priority className="h-full w-full object-cover" />
            </span>
            <span>
              <span className="block text-base font-black leading-5 tracking-tight text-[#0d2438]">نوا</span>
              <span className="block text-[10px] font-bold text-[#60758a]">مشاوره تحول دیجیتال</span>
            </span>
          </a>

          <nav aria-label="منوی اصلی" className="hidden items-center gap-7 text-sm font-bold text-[#60758a] md:flex">
            <a href="#approach" className="transition hover:text-[#0d2438]">رویکرد ما</a>
            <a href="#services" className="transition hover:text-[#0d2438]">خدمات</a>
            <a href="#contact" className="transition hover:text-[#0d2438]">گفت‌وگو</a>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href="/admin"
              className="hidden rounded-full border border-[#bfd1dc] bg-white/70 px-4 py-2.5 text-xs font-black text-[#0d2438] transition hover:border-[#22b8a7] hover:bg-white sm:inline-flex"
            >
              پنل دمو
            </a>
            <a
              href="#contact"
              className="rounded-full bg-[#22b8a7] px-5 py-2.5 text-sm font-black text-[#0d2438] transition hover:-translate-y-0.5 hover:bg-[#7be1d5]"
            >
              جلسه آشنایی
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="nava-grid relative">
        <div className="nava-shell grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#a9ded7] bg-[#e7f8f5] px-4 py-2 text-xs font-bold text-[#127c71]">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#22b8a7]" />
              {business.eyebrow}
            </p>

            <h1 className="text-[2rem] font-black leading-[1.5] tracking-tight text-[#0d2438] sm:text-5xl sm:leading-[1.4]">
              کارها را ساده‌تر کنید،
              <br />
              <span className="text-[#159c8e]">تصمیم‌ها را مطمئن‌تر.</span>
            </h1>

            <p className="nava-prose mt-6 max-w-xl text-base leading-9 text-[#526b80] sm:text-lg sm:leading-10">
              خیلی وقت‌ها همه می‌دانند یک جای کار می‌لنگد، اما نقطه شروع معلوم نیست. ما کمک می‌کنیم مسئله را روشن کنید،
              راه را بچینید و قدم اول را بی‌دردسر بردارید.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="rounded-2xl bg-[#0d2438] px-6 py-4 text-sm font-black text-white shadow-[0_14px_30px_rgba(13,36,56,.18)] transition hover:-translate-y-0.5 hover:bg-[#163b56]"
              >
                از مسئله‌تان بگویید
              </a>
              <a
                href="#approach"
                className="rounded-2xl border border-[#bfd1dc] bg-white/70 px-6 py-4 text-sm font-black text-[#0d2438] transition hover:border-[#22b8a7] hover:bg-white"
              >
                روش کار ما
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs font-bold text-[#60758a]">
              <li className="flex items-center gap-2"><span aria-hidden="true" className="text-[#22a99b]">✓</span> شروع از مسئله واقعی</li>
              <li className="flex items-center gap-2"><span aria-hidden="true" className="text-[#22a99b]">✓</span> قدم‌های کوچک و عملی</li>
              <li className="flex items-center gap-2"><span aria-hidden="true" className="text-[#22a99b]">✓</span> همراهی تا نتیجه</li>
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-bold text-[#60758a]">
              <span>برای تست گفتگو:</span>
              <span className="rounded-full bg-[#e7f8f5] px-3 py-1.5 text-[#127c71]">@assitentnovabot</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[480px]">
            <div aria-hidden="true" className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#d8f4ef] blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-10 -left-6 h-40 w-40 rounded-full bg-[#f3eee6] blur-3xl" />

            <div className="nava-shadow relative rounded-[30px] border border-white bg-white/95 p-5">
              <div className="flex items-center justify-between gap-4 border-b border-[#edf2f5] pb-5">
                <div>
                  <p className="text-[11px] font-bold text-[#60758a]">یک نگاه به وضعیت سازمان</p>
                  <p className="mt-1 text-sm font-black text-[#0d2438]">نمونه گزارش ارزیابی</p>
                </div>
                <span className="shrink-0 rounded-xl bg-[#e7f8f5] px-3 py-1.5 text-[10px] font-black text-[#127c71]">نمونه</span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#0d2438] p-4 text-white">
                  <p className="text-[11px] text-white/60">وضعیت فرایندها</p>
                  <p className="mt-2 text-2xl font-black">۶۴٪</p>
                  <p className="mt-1 text-[10px] text-[#7be1d5]">در حال بهتر شدن</p>
                </div>
                <div className="rounded-2xl bg-[#f3eee6] p-4">
                  <p className="text-[11px] text-[#60758a]">نقاط قابل بهبود</p>
                  <p className="mt-2 text-2xl font-black text-[#0d2438]">۱۲</p>
                  <p className="mt-1 text-[10px] text-[#60758a]">با اولویت مشخص</p>
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-[#e6eef2] p-4">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <p className="text-xs font-black text-[#0d2438]">پیشرفت برنامه</p>
                  <p className="text-[10px] font-bold text-[#22a99b]">سه‌ماه اول</p>
                </div>
                <div className="flex h-24 items-end gap-1.5" aria-hidden="true">
                  {[38, 52, 47, 68, 62, 82, 76, 92].map((height, index) => (
                    <span
                      key={index}
                      className={`flex-1 rounded-t-md ${index > 5 ? 'bg-[#22b8a7]' : 'bg-[#c9e7e2]'}`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3 rounded-2xl bg-[#f7fafc] p-3">
                <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e7f8f5] text-[#159c8e]">↗</span>
                <div className="min-w-0">
                  <p className="text-xs font-black text-[#0d2438]">قدم بعدی روشن است</p>
                  <p className="mt-1 truncate text-[10px] text-[#60758a]">جلسه هم‌فکری با مدیران</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="approach" className="nava-prose bg-white py-20 sm:py-24">
        <div className="nava-shell">
          <div className="max-w-2xl">
            <p className="nava-kicker">رویکرد ما</p>
            <h2 className="mt-3 text-2xl font-black leading-relaxed text-[#0d2438] sm:text-4xl sm:leading-relaxed">
              تحول دیجیتال با خریدن یک نرم‌افزار شروع نمی‌شود؛
              <br className="hidden sm:block" />
              با یک تصمیم درست شروع می‌شود.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number} className="rounded-3xl border border-[#e0eaf0] bg-[#f9fbfc] p-6 transition hover:-translate-y-1 hover:border-[#9edfd7] sm:p-7">
                <span className="text-sm font-black text-[#22a99b]" aria-hidden="true">{step.number}</span>
                <h3 className="mt-10 text-lg font-black text-[#0d2438]">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5d7287]">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="nava-prose bg-[#f3eee6] py-20 sm:py-24">
        <div className="nava-shell grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div>
            <p className="nava-kicker">خدمات</p>
            <h2 className="mt-3 text-2xl font-black leading-relaxed text-[#0d2438] sm:text-4xl sm:leading-relaxed">
              از یک سؤال ساده شروع می‌کنیم
              <br className="hidden sm:block" />
              و به یک قدم روشن می‌رسیم.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-8 text-[#5d7287]">
              هر همکاری با شناخت مسئله شروع می‌شود و به یک قدم روشن می‌رسد؛ نه به یک عالمه گزارش و حرف پیچیده.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {business.services.map((service, index) => (
              <article key={service.id} className="rounded-2xl bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <span aria-hidden="true" className="text-[11px] font-black text-[#22a99b]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-bold text-[#8a9aa8]">{service.price}</span>
                </div>
                <h3 className="mt-6 text-sm font-black text-[#0d2438]">{service.title}</h3>
                <p className="mt-2 text-xs leading-6 text-[#5d7287]">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="nava-prose bg-[#0d2438] py-16 text-white sm:py-24">
        <div className="nava-shell grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-black tracking-wide text-[#7be1d5]">یک گفت‌وگوی ساده</p>
            <h2 className="mt-3 text-2xl font-black leading-relaxed sm:text-4xl sm:leading-relaxed">
              یک مسئله دارید
              <br />
              که ذهن‌تان را مشغول کرده؟
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-8 text-white/65">
              در یک گفت‌وگوی کوتاه، مسئله را می‌شنویم و درباره قدم بعدی به جمع‌بندی می‌رسیم. بدون تعهد و بدون
              اصطلاحات پیچیده.
            </p>

            <dl className="mt-8 grid grid-cols-1 gap-3 text-xs text-white/70 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <dt className="font-bold text-white/50">زمان جلسه</dt>
                <dd className="mt-1 font-black text-white">۴۵ دقیقه</dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <dt className="font-bold text-white/50">هزینه آشنایی</dt>
                <dd className="mt-1 font-black text-white">بدون هزینه</dd>
              </div>
            </dl>
          </div>

          <div className="mx-auto w-full max-w-[520px] rounded-[26px] bg-white p-1.5">
            <ChatWidget />
          </div>
        </div>
      </section>

      <footer className="bg-[#081b2a] py-6 text-[11px] text-white/50">
        <div className="nava-shell flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© nova · نسخه نمایشی محصول</p>
          <p className="flex flex-wrap items-center gap-3">
            <span>مشاوره تحول دیجیتال و اتوماسیون سازمانی</span>
            <a href="/admin" className="text-[#7be1d5] transition hover:text-white">مشاهده پنل دمو ←</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
