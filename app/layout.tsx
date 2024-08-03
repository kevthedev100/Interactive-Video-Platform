import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { ToasterProvider } from '@/components/toaster-provider'
import { ModalProvider } from '@/components/modal-provider'
import ErrorBoundary from '../components/ErrorBoundary'  // Importieren Sie ErrorBoundary

import './globals.css'

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Videyou',
  description: 'Interaktive Videos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={font.className}>
          <ErrorBoundary>
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  )
}
