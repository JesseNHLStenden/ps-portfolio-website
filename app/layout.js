import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  generator: 'Next.js',
  applicationName: 'Bram | Professional Skills Portfolio',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript', "Tailwind", "Vercel", "Portfolio", "Bram Suurd"],
  authors: [{ name: 'Bram' }],
  creator: 'Bram Suurd',
  publisher: 'Bram Suurd',
  favicon: '/app/favicon.ico',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ps.bramsuurd.nl'),
    openGraph: {
  title: 'Bram | Professional Skills Portfolio',
    description: 'Welkom bij mijn portfolio website voor Professional Skills. Hier zal ik al mijn documenten op plaatsen die ik in de loop van mijn studie heb gemaakt.',
    url: '/defaultimg.png',
    siteName: 'Bram | Portfolio',
    images: [
      {
        url: 'https://ps.bramsuurd.nl/defaultimg.png',
        width: 1901,
        height: 916,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={metadata.icons.favicon} />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div>
            {children}
            <Analytics />
            <SpeedInsights />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
