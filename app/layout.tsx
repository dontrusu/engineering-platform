import "./globals.css";
import type { Metadata } from "next";
import { Barlow_Condensed, DM_Mono, DM_Sans } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";

const sections = [
  { label: "About", href: "/#about", number: "01" },
  { label: "Projects", href: "/#projects", number: "02" },
  { label: "Experience", href: "/#experience", number: "03" },
  { label: "Contact", href: "/#contact", number: "04" },
] as const;

function SectionLinks() {
  return (
    <ul className="site-navigation-list">
      {sections.map(({ label, href, number }) => (
        <li key={label}>
          <Link href={href} className="site-navigation-link">
            <span aria-hidden="true" className="site-navigation-number">
              {number}
            </span>
            <span aria-hidden="true" className="site-navigation-rule" />
            <span>{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

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

        <header className="mobile-header md:hidden">
          <Link href="/" className="site-identity">
            Engineering Lab
          </Link>
          <nav aria-label="Mobile section navigation">
            <SectionLinks />
          </nav>
        </header>

        <div className="site-frame">
          <aside className="desktop-rail hidden md:block">
            <div className="desktop-rail-inner">
              <Link href="/" className="site-identity">
                Engineering
                <br />
                Lab
              </Link>
              <nav
                aria-label="Section navigation"
                className="desktop-navigation"
              >
                <SectionLinks />
              </nav>
            </div>
          </aside>
          <div className="site-content">{children}</div>
        </div>
      </body>
    </html>
  );
}
