import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { StudentNumber, PortfolioWebsite } from "@/components/Buttons";
import { ModeToggle } from "@/components/ModeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  generator: "Next.js",
  applicationName: "Bram | Professional Skills Portfolio",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Tailwind",
    "Vercel",
    "Portfolio",
    "Bram Suurd",
  ],
  authors: [{ name: "Bram" }],
  creator: "Bram Suurd",
  publisher: "Bram Suurd",
  favicon: "/app/favicon.ico",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ps.bramsuurd.nl"),
  openGraph: {
    title: "Bram | Professional Skills Portfolio",
    description:
      "Welkom bij mijn portfolio website voor Professional Skills. Hier zal ik al mijn documenten op plaatsen die ik in de loop van mijn studie heb gemaakt.",
    url: "/defaultimg.png",
    siteName: "Bram | Portfolio",
    images: [
      {
        url: "https://ps.bramsuurd.nl/defaultimg.png",
        width: 1901,
        height: 916,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://analytics.bramsuurd.nl/script.js"
          data-website-id="23aa29f6-9b15-4b52-9c89-710b7d31e227"
        ></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="select-none">
            {children}
            <PortfolioWebsite />
            <StudentNumber />
            <Toaster richColors position="bottom-center" />
            <ModeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
