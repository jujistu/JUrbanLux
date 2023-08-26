import { GlobalState } from '@/context/Global-Context';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavBar } from '@/components/navBar/NavBar';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <GlobalState>
          <NavBar />
          <main className='flex min-h-screen flex-col mt-16'>{children}</main>
        </GlobalState>
      </body>
    </html>
  );
}
