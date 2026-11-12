import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'نوا | مشاور تحول دیجیتال',
  description: 'دموی دستیار هوشمند مشاوره و رزرو جلسه برای نوا؛ تیم مشاوره تحول دیجیتال و اتوماسیون سازمانی',
  icons: {
    icon: [
      { url: '/nova-symbol.png', type: 'image/png', sizes: '512x512' },
      { url: '/nova-logo-32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/nova-symbol-192.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-w-0">{children}</body>
    </html>
  );
}
