import type { Metadata } from 'next'
import './globals.css'
import { cn } from '@/lib/utils'
import { inter } from '@/lib/fonts'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'

import { ourFileRouter } from './api/uploadthing/core'

export const metadata: Metadata = {
  title: 'Gleam',
  description: 'Capture, share, and shine together.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn('bg-primary-foreground text-foreground', inter.className)}
      >
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        {children}
      </body>
    </html>
  )
}
