'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Msg = { role: 'user' | 'assistant'; text: string };

const quickPrompts = ['از کجا شروع کنیم؟', 'یک فرایند تکراری داریم', 'رزرو جلسه آشنایی'];

const WELCOME =
  'سلام! من دستیار نوا هستم. هر سؤالی درباره فرایندها، اتوماسیون یا مسیر تحول دیجیتال دارید، بفرمایید؛ از همین‌جا شروع کنیم.';

export default function ChatWidget() {
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'assistant', text: WELCOME }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const bottom = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let id = localStorage.getItem('sid');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('sid', id);
    }
    setSessionId(id);
  }, []);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [msgs, loading]);

  async function send(value = input) {
    const text = value.trim();
    if (!text || loading || !sessionId) return;

    setInput('');
    setMsgs((current) => [...current, { role: 'user', text }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text }),
      });
      const data = await response.json().catch(() => null);
      setMsgs((current) => [
        ...current,
        {
          role: 'assistant',
          text: data?.reply ?? (response.ok ? 'پیام‌تان به دستم نرسید؛ لطفاً دوباره بفرستید.' : 'سامانه موقتاً در دسترس نیست؛ چند لحظه دیگر دوباره امتحان کنید.'),
        },
      ]);
    } catch {
      setMsgs((current) => [
        ...current,
        { role: 'assistant', text: 'ارتباط قطع شد؛ چند لحظه دیگر دوباره امتحان کنید.' },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <section
      dir="rtl"
      lang="fa"
      aria-label="گفت‌وگو با دستیار نوا"
      className="flex h-[560px] w-full flex-col overflow-hidden rounded-[22px] bg-white text-right sm:h-[590px]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#e7eef2] px-4 py-3.5 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#0d2438] p-1">
            <Image src="/nova-symbol.png" alt="" width={40} height={40} className="h-full w-full object-cover" />
            <span aria-hidden="true" className="absolute bottom-0.5 left-0.5 h-2 w-2 rounded-full border-2 border-white bg-[#22b8a7]" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-[#0d2438]">دستیار نوا</p>
            <p className="mt-0.5 truncate text-[10px] font-bold text-[#22a99b]">آنلاین · پاسخ در چند ثانیه</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-[#f7fafc] px-2.5 py-1 text-[10px] font-bold text-[#738697]">
          گفت‌وگوی خصوصی
        </span>
      </div>

      <div
        className="flex-1 space-y-3 overflow-y-auto bg-[#fbfdfe] px-4 py-4 sm:px-5"
        aria-live="polite"
        aria-relevant="additions"
      >
        {msgs.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <p
              className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13px] leading-7 sm:text-sm sm:leading-7 ${
                message.role === 'user'
                  ? 'rounded-tr-md bg-[#0d2438] text-white'
                  : 'rounded-tl-md border border-[#e0ebef] bg-white text-[#29445a]'
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}

        {msgs.length === 1 && (
          <div className="flex flex-wrap justify-end gap-2 pt-1">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => send(prompt)}
                className="rounded-full border border-[#b9e5df] bg-[#e7f8f5] px-3 py-2 text-[11px] font-bold text-[#127c71] transition hover:bg-[#d4f3ee]"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex justify-end">
            <p className="rounded-2xl rounded-tl-md bg-[#e7f8f5] px-3.5 py-2.5 text-xs font-bold text-[#159c8e]">
              دارد می‌نویسد…
            </p>
          </div>
        )}

        <div ref={bottom} />
      </div>

      <div className="border-t border-[#e7eef2] bg-white p-3">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void send();
          }}
          className="flex items-center gap-2 rounded-2xl border border-[#dbe6ee] bg-[#fbfdfe] p-1.5 focus-within:border-[#22b8a7]"
        >
          <label htmlFor="nova-message" className="sr-only">پیام شما</label>
          <input
            ref={inputRef}
            id="nova-message"
            dir="rtl"
            lang="fa"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="سؤال یا موضوع‌تان را بنویسید…"
            autoComplete="off"
            maxLength={1000}
            className="min-w-0 flex-1 bg-transparent px-2.5 py-1.5 text-sm text-[#0d2438] outline-none placeholder:text-[#8a9aa8]"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="shrink-0 rounded-xl bg-[#22b8a7] px-3.5 py-2 text-xs font-black text-[#0d2438] transition hover:bg-[#7be1d5] disabled:cursor-not-allowed disabled:opacity-40"
          >
            ارسال
          </button>
        </form>
        <p className="mt-2 px-2 text-[10px] leading-5 text-[#8a9aa8]">
          اطلاعات تماس شما فقط برای پیگیری همین درخواست استفاده می‌شود.
        </p>
      </div>
    </section>
  );
}
