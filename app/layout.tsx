import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Dashboard - Content Management',
  description:
    'A responsive admin dashboard for managing and analyzing content',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
