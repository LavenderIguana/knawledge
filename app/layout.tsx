'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from "./providers";
import { SessionProvider } from "next-auth/react";
import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { usePathname } from 'next/navigation';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <html lang="en">
      <body className={inter.variable}>
        <SessionProvider>
          <Providers>
            <div className="flex min-h-screen flex-col">
              {!isHomePage && <Header />}
              <main className={`flex-1 ${isHomePage ? '' : 'pt-16'}`}>
                {children}
              </main>
            </div>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
}
