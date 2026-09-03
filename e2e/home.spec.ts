import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Home exposes its primary structure accessibly", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("region", { name: "About" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Projects" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Experience" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Contact" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toHaveAttribute("href", "#main-content");
  await expect(
    page.getByRole("link", { name: "View Project Page" }).first(),
  ).toBeVisible();

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
});

test("desktop navigation reaches Home sections", async ({ page }) => {
  await page.goto("/");

  const navigation = page.getByRole("navigation", {
    name: "Section navigation",
    exact: true,
  });

  await expect(navigation.getByRole("link")).toHaveCount(4);
  await expect(navigation.getByRole("link", { name: "About" })).toHaveAttribute(
    "href",
    "/#about",
  );
  await expect(
    navigation.getByRole("link", { name: "Projects" }),
  ).toHaveAttribute("href", "/#projects");

  await expect(navigation.getByRole("link", { name: "About" })).toHaveAttribute(
    "aria-current",
    "location",
  );

  await page.mouse.wheel(0, 1_000);
  await expect(
    navigation.getByRole("link", { name: "Projects" }),
  ).toHaveAttribute("aria-current", "location");
  await expect(
    navigation.getByRole("link", { name: "About" }),
  ).not.toHaveAttribute("aria-current", "location");

  await page.keyboard.press("End");
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 1,
      ),
    )
    .toBe(true);
  await expect(
    navigation.getByRole("link", { name: "Contact" }),
  ).toHaveAttribute("aria-current", "location");
});

test("desktop navigation marks a clicked lower section as current", async ({
  page,
}) => {
  await page.goto("/");

  const navigation = page.getByRole("navigation", {
    name: "Section navigation",
    exact: true,
  });

  for (const section of ["Experience", "Contact"]) {
    const link = navigation.getByRole("link", { name: section });
    await link.click();
    await expect(link).toHaveAttribute("aria-current", "location");
  }
});

test("manual scrolling returns current-section control to observation", async ({
  page,
}) => {
  await page.goto("/");

  const navigation = page.getByRole("navigation", {
    name: "Section navigation",
    exact: true,
  });
  const experienceLink = navigation.getByRole("link", {
    name: "Experience",
  });

  await experienceLink.click();
  await expect(experienceLink).toHaveAttribute("aria-current", "location");

  await page.mouse.wheel(0, -100);
  await expect(experienceLink).not.toHaveAttribute("aria-current", "location");
  await expect(
    navigation.getByRole("link", { name: "Projects" }),
  ).toHaveAttribute("aria-current", "location");
});

test("returning Home clears navigation click intent", async ({ page }) => {
  await page.goto("/");

  const navigation = page.getByRole("navigation", {
    name: "Section navigation",
    exact: true,
  });
  await navigation.getByRole("link", { name: "Experience" }).click();
  await expect(
    navigation.getByRole("link", { name: "Experience" }),
  ).toHaveAttribute("aria-current", "location");

  await page
    .getByRole("link", { name: "Engineering Lab", exact: true })
    .click();

  await expect(page).toHaveURL(/\/$/);
  await expect(navigation.getByRole("link", { name: "About" })).toHaveAttribute(
    "aria-current",
    "location",
  );
});

test("clicking the current fragment scrolls back to its section", async ({
  page,
}) => {
  await page.goto("/");

  const experienceLink = page
    .getByRole("navigation", {
      name: "Section navigation",
      exact: true,
    })
    .getByRole("link", { name: "Experience" });

  await experienceLink.click();
  await expect(page).toHaveURL(/#experience$/);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);

  await experienceLink.click();
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(500);
});

test("section navigation returns from a secondary route to its Home section", async ({
  page,
}) => {
  await page.goto("/projects");

  const experienceLink = page
    .getByRole("navigation", { name: "Section navigation", exact: true })
    .getByRole("link", { name: "Experience" });
  await experienceLink.click();

  await expect(page).toHaveURL(/\/#experience$/);
  await expect(experienceLink).toHaveAttribute("aria-current", "location");

  await expect
    .poll(() =>
      page
        .getByRole("region", { name: "Experience" })
        .evaluate((section) => Math.round(section.getBoundingClientRect().top)),
    )
    .toBeGreaterThan(0);
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(500);
});

test("responsive shell shows only its viewport navigation", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("navigation", { name: "Mobile section navigation" }),
  ).toBeHidden();
  await expect(
    page.getByRole("navigation", { name: "Section navigation", exact: true }),
  ).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });

  await expect(
    page.getByRole("navigation", { name: "Mobile section navigation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Section navigation", exact: true }),
  ).toBeHidden();
});

test("mobile navigation stays visible and follows Home sections", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/");

  const navigation = page.getByRole("navigation", {
    name: "Mobile section navigation",
  });

  await expect(navigation).toBeVisible();
  await expect(navigation.getByRole("link")).toHaveCount(4);
  await expect(navigation.getByRole("link", { name: "About" })).toHaveAttribute(
    "aria-current",
    "location",
  );
  await expect(
    navigation.getByRole("link", { name: "Experience" }),
  ).toHaveAttribute("href", "/#experience");
  await expect(
    navigation.getByRole("link", { name: "Contact" }),
  ).toHaveAttribute("href", "/#contact");

  await expect
    .poll(() =>
      navigation.evaluate(
        (element) => element.scrollWidth > element.clientWidth,
      ),
    )
    .toBe(true);

  await page.mouse.wheel(0, 1_500);
  await expect(
    navigation.getByRole("link", { name: "Projects" }),
  ).toHaveAttribute("aria-current", "location");

  await navigation.getByRole("link", { name: "Contact" }).click();

  await expect(page).toHaveURL(/#contact$/);

  const headerBottom = await page
    .getByRole("banner")
    .evaluate((header) => header.getBoundingClientRect().bottom);
  const contactTop = await page
    .getByRole("region", { name: "Contact" })
    .evaluate((section) => section.getBoundingClientRect().top);
  expect(contactTop).toBeGreaterThanOrEqual(headerBottom);

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
});

test("secondary routes do not mark a Home section as current", async ({
  page,
}) => {
  await page.goto("/projects");

  const navigation = page.getByRole("navigation", {
    name: "Section navigation",
    exact: true,
  });

  await expect(navigation.getByRole("link")).toHaveCount(4);
  await expect(navigation.locator('[aria-current="location"]')).toHaveCount(0);

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);

  await page.goto("/projects/atlas");
  await expect(
    page
      .getByRole("navigation", { name: "Section navigation", exact: true })
      .locator('[aria-current="location"]'),
  ).toHaveCount(0);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/projects");
  await expect(
    page.getByRole("navigation", { name: "Mobile section navigation" }),
  ).toBeVisible();

  const mobileAccessibility = await new AxeBuilder({ page }).analyze();
  expect(mobileAccessibility.violations).toEqual([]);
});

test("client-side navigation clears the current Home section", async ({
  page,
}) => {
  await page.goto("/");

  const navigation = page.getByRole("navigation", {
    name: "Section navigation",
    exact: true,
  });
  await navigation.getByRole("link", { name: "Projects" }).click();
  await expect(
    navigation.getByRole("link", { name: "Projects" }),
  ).toHaveAttribute("aria-current", "location");

  await page.getByRole("link", { name: "View all projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(
    page
      .getByRole("navigation", { name: "Section navigation", exact: true })
      .locator('[aria-current="location"]'),
  ).toHaveCount(0);
});

test("reduced motion keeps section navigation immediate", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await page
    .getByRole("navigation", { name: "Section navigation", exact: true })
    .getByRole("link", { name: "Projects" })
    .click();
  await expect(page).toHaveURL(/#projects$/);
});
