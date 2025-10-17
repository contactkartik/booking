import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Book Karo India – Event Planner',
  description: 'Wedding & Event Planning across India: photography, décor, catering, entertainment, logistics. Expert planners for your perfect day.',
  icons: { icon: '/favicon.ico' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Event', name: 'Book Karo India – Event Planner',
          eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          organizer: { '@type': 'Organization', name: 'Book Karo India', url: 'https://www.bookkaroindia.com' }
        })}} />
      </head>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX" strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXX');
        `}</Script>
        {children}
      </body>
    </html>
  )
}
