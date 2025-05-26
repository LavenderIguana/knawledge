'use client'

import './globals.css'
import { JetBrains_Mono } from 'next/font/google'
import { Providers } from "./providers";
import { SessionProvider } from "next-auth/react";
import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { usePathname } from 'next/navigation';

const jicedMono = JetBrains_Mono({
  variable: '--font-jiced-mono',
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
      <body className={jicedMono.variable}>
        <SessionProvider>
          <Providers>
            <div className="flex flex-col h-screen">
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
