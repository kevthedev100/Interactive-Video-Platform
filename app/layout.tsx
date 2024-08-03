import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToasterProvider } from '@/components/toaster-provider'
import { ModalProvider } from '@/components/modal-provider'

import './globals.css'

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Videyou',
  description: 'Interaktive Videos',
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { id: string }
}) {
  // Überprüfen, ob die Route eine öffentliche Ansicht ist
  const isViewRoute = params?.id?.startsWith('public-interactive');

  return (
    <>
      {isViewRoute ? (
        <html lang="en">
          <body className={font.className}>
            {children}
          </body>
        </html>
      ) : (
        <ClerkProvider>
          <html lang="en" suppressHydrationWarning>
            <body className={font.className}>
              <ToasterProvider />
              <ModalProvider />
              {children}
            </body>
          </html>
        </ClerkProvider>
      )}
    </>
  )
}
