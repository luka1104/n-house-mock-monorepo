'use client'

import { Metadata } from 'next'

import { Toaster } from 'react-hot-toast'

import '@/app/globals.css'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import Header from '@/components/header'
import { ChakraProvider } from '@chakra-ui/react'
import { PrivyProvider } from '@privy-io/react-auth'

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
        <PrivyProvider
          createPrivyWalletOnLogin
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
          config={{
            appearance: {
              // This configures your login modal to show wallet login options above other options.
              showWalletLoginFirst: false
            },
            // This configures wallet, email, Google, and Twitter login for your app.
            loginMethods: ['wallet', 'email', 'google', 'apple']
          }}
          onSuccess={() => window.location.reload()}
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
            <TailwindIndicator />
          </Providers>
        </PrivyProvider>
      </body>
    </html>
  )
}
