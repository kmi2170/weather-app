import { test, expect } from "@playwright/test";

test.describe("Search bar", () => {
  test.describe("Open search modal", () => {
    test("should open search modal by pressing control+k", async ({ page }) => {
      await page.goto("http://localhost:3000/");
      await page.locator("body").press("ControlOrMeta+k");
      await expect(page.getByTestId("search-location-modal")).toHaveText(
        "Type more than one character"
      );
    });

    test("should open search modal by clicking on search bar", async ({
      page,
    }) => {
      await page.goto("http://localhost:3000/");
      await page.getByRole("textbox", { name: "Search City" }).click();
      await expect(page.getByTestId("search-location-modal")).toHaveText(
        "Type more than one character"
      );
    });
  });

  test.describe("Close search modal", () => {
    test("should close search modal by pressing escape key", async ({
      page,
    }) => {
      await page.goto("http://localhost:3000/");
      await page.getByRole("textbox", { name: "Search City" }).click();
      await page.locator("body").press("Escape");
      await expect(page.getByTestId("search-location-modal")).toBeHidden();
    });

    test("should close search modal by clicking on close button", async ({
      page,
    }) => {
      await page.goto("http://localhost:3000/");
      await page.getByRole("textbox", { name: "Search City" }).click();
      await page.getByRole("img").first().click();
      await expect(page.getByTestId("search-location-modal")).toBeHidden();
    });
  });

  test.describe("Search for a city", () => {
    test("should display the city on the list on the search modal by type in city name", async ({
      page,
    }) => {
      await page.goto("http://localhost:3000/");
      await page.getByRole("textbox", { name: "Search City" }).click();
      await page
        .getByRole("textbox", { name: "Enter City Name" })
        .fill("tokyo");
      await expect(
        page.getByRole("heading", { name: "Tokyo, Tokyo, Japan" })
      ).toBeVisible();
    });

    test("should display the weather information of the city by clicking the city name on the list on the search modal", async ({
      page,
    }) => {
      await page.goto("http://localhost:3000/");
      await page.getByRole("textbox", { name: "Search City" }).click();
      await page
        .getByRole("textbox", { name: "Enter City Name" })
        .fill("tokyo");
      await page.getByRole("heading", { name: "Tokyo, Tokyo, Japan" }).click();
      await expect(page.getByRole("heading", { name: "Tokyo," })).toBeVisible();
    });
  });
});
