import { test, expect } from "@playwright/test";

/**
 * This test should be run on a desktop browser.
 */
test.beforeEach("open page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test.describe("Links on desktop", () => {
  test("Should display the Minutely by clicking the Minutely link", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "minutely", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Minutely", exact: true })
    ).toBeInViewport();
  });
  test("Should display the Hourly by clicking the Hourly link", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "48hours", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "48 Hours", exact: true })
    ).toBeInViewport();
  });
  test("Should display the Daily by clicking the Daily link", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "daily", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Daily", exact: true })
    ).toBeInViewport();
  });
  test("Should display the 48 Hours Charts days by clicking the Charts link", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "charts", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "48 Hours Charts", exact: true })
    ).toBeInViewport();
  });
  test("Should display the Map by clicking the Map link", async ({ page }) => {
    await page.getByRole("link", { name: "map", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Map", exact: true })
    ).toBeInViewport();
  });
  test("Should display the Current by clicking the Map link and then clicking the Current link", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "map", exact: true }).click();
    await page.getByRole("link", { name: "current", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Current", exact: true })
    ).toBeInViewport();
  });
});
