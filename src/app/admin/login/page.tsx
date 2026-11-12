import Image from 'next/image';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { signAdmin } from '@/lib/auth';

async function login(formData: FormData) {
  'use server';

  if (formData.get('password') !== process.env.ADMIN_PASSWORD) {
    redirect('/admin/login?error=1');
  }

  (await cookies()).set('admin', await signAdmin(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect('/admin');
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main dir="rtl" lang="fa" className="nava-grid flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-[400px]">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-[#0d2438] p-1">
            <Image src="/nova-symbol.png" alt="" width={44} height={44} className="h-full w-full object-cover" />
          </span>
          <div>
            <p className="text-sm font-black leading-5 text-[#0d2438]">نوا</p>
            <p className="text-[10px] font-bold text-[#60758a]">پنل مدیریت</p>
          </div>
        </div>

        <div className="nava-shadow rounded-3xl border border-white bg-white p-6 sm:p-7">
          <h1 className="text-xl font-black text-[#0d2438]">ورود به پنل</h1>
          <p className="mt-2 text-xs leading-6 text-[#5d7287]">
            برای دیدن نوبت‌ها و سرنخ‌ها، رمز مدیریت را وارد کنید.
          </p>

          <form action={login} className="mt-6 space-y-3">
            <div>
              <label htmlFor="password" className="mb-1.5 block text-[11px] font-bold text-[#29445a]">
                رمز عبور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="رمز عبور مدیریت"
                className="w-full rounded-xl border border-[#dbe6ee] bg-[#fbfdfe] px-3.5 py-3 text-sm outline-none transition focus:border-[#22b8a7]"
              />
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-[#fff0ef] px-3 py-2 text-[11px] font-bold text-[#c2413b]">
                رمز واردشده درست نیست. دوباره امتحان کنید.
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#0d2438] py-3 text-sm font-black text-white transition hover:bg-[#163b56]"
            >
              ورود
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-[10px] font-bold text-[#8a9aa8]">
          نسخه نمایشی · دسترسی مخصوص مدیر محصول
        </p>
      </div>
    </main>
  );
}
