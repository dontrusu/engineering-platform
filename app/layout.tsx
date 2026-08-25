import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Platform",
  description:
    "A shell for a portfolio platform built with Next.js and App Router.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
