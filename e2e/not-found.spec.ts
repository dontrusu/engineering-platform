import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

const notFoundPaths = ["/outside-the-lab", "/projects/unknown-project"];
const colorSchemes = ["light", "dark"] as const;

async function getBackgroundColor(element: Locator) {
  return element.evaluate((node) => getComputedStyle(node).backgroundColor);
}

async function expectThemeBackground(
  element: Locator,
  themeBackground: string,
) {
  await expect(element).toHaveCSS("background-color", themeBackground);
}

for (const path of notFoundPaths) {
  test(`${path} renders the same branded not-found experience for every system color preference`, async ({
    page,
  }) => {
    const renderedThemeBackgrounds: string[] = [];

    for (const colorScheme of colorSchemes) {
      await page.emulateMedia({ colorScheme });
      const response = await page.goto(path);

      expect(response?.status()).toBe(404);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );

      const main = page.getByRole("main");
      await expect(main).toHaveAttribute("id", "main-content");
      await expect(main).toHaveAttribute("tabindex", "-1");
      await expect(
        main.getByRole("heading", { level: 1, name: "Route not found" }),
      ).toBeVisible();
      await expect
        .poll(() =>
          main
            .getByRole("heading", { level: 1, name: "Route not found" })
            .evaluate((heading) => {
              const headingBounds = heading.getBoundingClientRect();
              const mainBounds = heading
                .closest("main")!
                .getBoundingClientRect();
              return Math.abs(
                headingBounds.left +
                  headingBounds.width / 2 -
                  (mainBounds.left + mainBounds.width / 2),
              );
            }),
        )
        .toBeLessThanOrEqual(2);
      await expect(
        main.getByText("This experiment led somewhere outside the lab."),
      ).toBeVisible();
      await expect(main.getByText("404", { exact: true })).toBeVisible();

      const recoveryLink = main.getByRole("link", {
        name: "Return to the lab",
      });
      await expect(recoveryLink).toHaveAttribute("href", "/");

      const navigation = page.getByRole("navigation", {
        name: "Section navigation",
        exact: true,
      });
      await expect(navigation).toBeVisible();
      await expect(navigation.locator('[aria-current="location"]')).toHaveCount(
        0,
      );
      const themeBackground = await getBackgroundColor(page.locator("html"));
      renderedThemeBackgrounds.push(themeBackground);
      await expectThemeBackground(page.locator("body"), themeBackground);
      await expectThemeBackground(page.locator("aside"), themeBackground);

      const accessibility = await new AxeBuilder({ page }).analyze();
      expect(accessibility.violations).toEqual([]);
    }

    expect(new Set(renderedThemeBackgrounds).size).toBe(1);
  });
}

test("the mobile not-found experience retains its themed recovery shell", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const renderedHeaderBackgrounds: string[] = [];

  for (const colorScheme of colorSchemes) {
    await page.emulateMedia({ colorScheme });
    await page.goto("/outside-the-lab");

    const header = page.getByRole("banner");
    const navigation = page.getByRole("navigation", {
      name: "Mobile section navigation",
    });
    await expect(header).toBeVisible();
    await expect(navigation).toBeVisible();
    await expect(navigation.locator('[aria-current="location"]')).toHaveCount(
      0,
    );

    const themeBackground = await getBackgroundColor(page.locator("html"));
    await expectThemeBackground(page.locator("body"), themeBackground);

    const headerBackground = await getBackgroundColor(header);
    expect(headerBackground).not.toBe("rgba(0, 0, 0, 0)");
    renderedHeaderBackgrounds.push(headerBackground);
  }

  expect(new Set(renderedHeaderBackgrounds).size).toBe(1);

  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await skipLink.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();

  const recoveryLink = page.getByRole("link", { name: "Return to the lab" });
  await recoveryLink.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/$/);
});
