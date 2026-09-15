import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

// This is an enforced, request-independent policy so pages remain statically
// renderable. Next.js requires inline framework bootstrap scripts and styles;
// all network-loaded runtime resources remain restricted to this origin.
const contentSecurityPolicy = [
  "default-src 'self'",
  // Allow eval only in development so React can show detailed error stacks.
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  // Allow WebSockets only in development so Next.js can send Fast Refresh updates.
  `connect-src 'self'${isDevelopment ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  // test:e2e sets this to .next-e2e so its fixture-backed build does not
  // replace the normal .next build.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  async headers() {
    // The catch-all also protects framework-rendered not-found HTML.
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
