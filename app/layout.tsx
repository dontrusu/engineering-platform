import "./globals.css";
import type { Metadata } from "next";
import { Barlow_Condensed, DM_Mono, DM_Sans } from "next/font/google";

import { cn } from "@/lib/utils";
import { sharedSocialImage, siteOrigin } from "@/lib/site";

import { SiteNavigation } from "./_components/site-navigation/site-navigation";

const display = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["600", "700", "800"],
});
const body = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const mono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  // metadataBase resolves route-relative canonical and social-image URLs to
  // the production origin when Next.js renders the final head elements.
  metadataBase: new URL(siteOrigin),
  title: {
    default: "Engineering Lab — Denys Shybkovskyy",
    // Child routes provide short titles such as "Projects" or "Atlas".
    template: "%s | Engineering Lab",
  },
  openGraph: {
    siteName: "Engineering Lab",
    images: [sharedSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [sharedSocialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(
        "font-sans",
        display.variable,
        body.variable,
        mono.variable,
      )}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <SiteNavigation>{children}</SiteNavigation>
      </body>
    </html>
  );
}
