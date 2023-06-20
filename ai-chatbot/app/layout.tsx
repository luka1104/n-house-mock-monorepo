'use client'

import { Toaster } from 'react-hot-toast'

import '@/app/globals.css'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'
import Header from '@/components/header'
import { ChakraProvider } from '@chakra-ui/react'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Toaster />
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <ChakraProvider>
            <div className="flex min-h-screen flex-col">
              {/* @ts-ignore */}
              <Header />
              <main className="bg-muted/50 flex flex-1 flex-col">
                {children}
              </main>
            </div>
          </ChakraProvider>
        </Providers>
      </body>
    </html>
  )
}
