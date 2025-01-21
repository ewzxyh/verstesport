import { draftMode } from "next/headers";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { siteConfig } from "@/config/metadata";

import "@/app/globals.css";

import Header from "@/components/Globals/Header/Header";
import Footer from "@/components/Globals/Footer/Footer";
import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Squares } from "@/components/ui/squares-background";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: "Vestesport",
      url: "https://vestesport.com.br",
    },
  ],
  creator: "Vestesport",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@vestesport",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="pt-br">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} no-underline bg-white relative`}>
        <div className="fixed inset-0 z-0">
          <Squares 
            direction="down"
            speed={0.1}
            squareSize={40}
            borderColor="#333" 
            hoverFillColor="#222"
            className="-z-50"
          />
        </div>
        <div className="relative z-50 bg-white">
          <div className="sm:mx-2 md:mx-8 lg:mx-16 xl:mx-40 2xl:mx-64 z-50">
            {isEnabled && <PreviewNotice />}
            <Header />
            <main className="no-underline border-x border-neutral-200 pb-16 -mt-6 z-40">
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
