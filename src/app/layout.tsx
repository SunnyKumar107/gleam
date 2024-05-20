import type { Metadata } from 'next'
import './globals.css'
import { cn } from '@/lib/utils'
import { inter } from '@/lib/fonts'

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
        {children}
      </body>
    </html>
  )
}
