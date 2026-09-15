import nextConfig from "../../next.config";
import { expectedContentSecurityPolicy } from "../contracts/security-headers";

describe("response security policy", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("applies the agreed security headers to every route", async () => {
    expect(nextConfig.headers).toBeTypeOf("function");

    const routes = await nextConfig.headers!();
    expect(routes).toHaveLength(1);
    expect(routes[0]?.source).toBe("/:path*");

    const headers = Object.fromEntries(
      routes[0]?.headers.map(({ key, value }) => [key, value]) ?? [],
    );
    expect(headers).toMatchObject({
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    });
    expect(headers).not.toHaveProperty("Strict-Transport-Security");
    expect(headers["Content-Security-Policy"]).toBe(
      expectedContentSecurityPolicy,
    );
  });

  it("allows the runtime features required by the development server", async () => {
    vi.resetModules();
    vi.stubEnv("NODE_ENV", "development");

    const developmentConfig = (await import("../../next.config")).default;
    const routes = await developmentConfig.headers!();
    const headers = Object.fromEntries(
      routes[0]?.headers.map(({ key, value }) => [key, value]) ?? [],
    );

    expect(headers["Content-Security-Policy"]).toContain("'unsafe-eval'");
    expect(headers["Content-Security-Policy"]).toContain(
      "connect-src 'self' ws: wss:",
    );
  });
});
