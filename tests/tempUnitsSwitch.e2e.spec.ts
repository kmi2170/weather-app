import { test, expect } from "@playwright/test";

test.beforeEach("open page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test.describe("temperature units switch", () => {
  test("Should display the temperature in Celsius by clicking the Celsius button", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "°C" }).click();
    await expect(page.locator("h3").getByText("°C")).toBeVisible();
  });

  test("Should display the temperature in Fahrenheit by clicking the Fahrenheit button", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "°F" }).click();
    await expect(page.locator("h3").getByText("°F")).toBeVisible();
  });
});
