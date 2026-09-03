import "./globals.css";
import type { Metadata } from "next";
import { Barlow_Condensed, DM_Mono, DM_Sans } from "next/font/google";

import { cn } from "@/lib/utils";

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
  title: "Engineering Lab",
  description:
    "A shell for a portfolio platform built with Next.js and App Router.",
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
