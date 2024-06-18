import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { StudentNumber, PortfolioWebsite } from "@/components/Buttons";
import { ModeToggle } from "@/components/ModeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  generator: "Next.js",
  applicationName: "Jesse | Professional Skills Portfolio",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Tailwind",
    "Vercel",
    "Portfolio",
    "Jesse van der Voet",
  ],
  authors: [{ name: "Jesse" }],
  creator: "Jesse van der Voet",
  publisher: "Jesse van der Voet",
  favicon: "/app/favicon.ico",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ps-j.pockethost.io"),
  openGraph: {
    title: "Jesse | Professional Skills Portfolio",
    description:
      "Welkom bij mijn portfolio website voor Professional Skills. Hier zal ik al mijn documenten op plaatsen die ik in de loop van mijn studie heb gemaakt.",
    url: "/defaultimg.png",
    siteName: "Jesse | Portfolio",
    images: [
      {
        url: "",
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
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="select-none">
            {children}
            <PortfolioWebsite />
            <StudentNumber />
            <Toaster richColors position="bottom-center" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
