import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Bram | Professional Skills Portfolio',
  description: 'Welkom bij mijn portfolio website voor Professional Skills. Hier zal ik al mijn documenten op plaatsen die ik in de loop van mijn studie heb gemaakt.',
  generator: 'Next.js',
  applicationName: 'Bram | Professional Skills Portfolio',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript', "Tailwind", "Vercel", "Portfolio", "Bram Suurd"],
  authors: [{ name: 'Bram' }],
  creator: 'Bram Suurd',
  publisher: 'Bram Suurd',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ps.bramsuurd.nl'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Next.js',
    description: 'Welkom bij mijn portfolio website voor Professional Skills. Hier zal ik al mijn documenten op plaatsen die ik in de loop van mijn studie heb gemaakt.',
    url: 'https://bramsuurd.nl/defaultimg.png',
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
