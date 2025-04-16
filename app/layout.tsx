'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from "./providers";
import { SessionProvider } from "next-auth/react";
import { Metadata } from 'next';

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
  return (
    <html lang="en">
      <body className={inter.variable}>
        <SessionProvider>
          <Providers>
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
}
