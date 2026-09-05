# Production launch checklist

Repository code defines the site's canonical metadata, discovery endpoints,
assets, and response security policy. Complete these account-level settings
before launch. This file is operational documentation; Vercel does not read it
during a build or deployment:

- [ ] Import `dontrusu/engineering-platform` into Vercel and keep the detected
      Next.js build settings.
- [ ] Configure the Vercel Git production branch as `main`.
- [ ] Disable deployments for non-production branches so pull requests do not
      create preview deployments.
- [ ] Assign `denysshybkovskyy.dev` to the production deployment and verify
      HTTPS on the apex hostname.
- [ ] Assign `www.denysshybkovskyy.dev` and configure a permanent redirect to
      `https://denysshybkovskyy.dev` at the Vercel/domain layer.
- [ ] Protect `main` in GitHub: block direct pushes and require pull requests.
- [ ] After #13 lands, require each CI check owned by #13 before merging.
- [ ] Do not require approving reviews; reviews remain optional.
- [ ] Verify the production Home page, every canonical Project Page,
      `/sitemap.xml`, `/robots.txt`, an unknown Project slug, and a removed
      route before considering HSTS in separate work.
