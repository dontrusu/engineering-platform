import nextConfig from "./next.config";

describe("response security policy", () => {
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
    expect(headers["Content-Security-Policy"]).toContain(
      "frame-ancestors 'none'",
    );
  });
});
