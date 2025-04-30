import { test, expect } from "@playwright/test";

const cities = [
  {
    typed: "london",
    candidate: "London, England, Greater London, United Kingdom",
    displayed: "London, ",
  },
  // {
  //   typed: "tokyo",
  //   candidate: "Tokyo, Tokyo, Japan",
  //   displayed: "Tokyo,",
  // },
  // {
  //   typed: "new york",
  //   candidate: "New York, New York, United States",
  //   displayed: "New York,",
  // },
];

/**
 * On parallel runs, test might fail because of many API calls at one time
 */
test.describe.configure({ mode: "serial" });

test.beforeEach("open page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.waitForTimeout(2000);
});

test.describe("Search bar", () => {
  test.describe("Open search modal", () => {
    test("should open search modal by pressing control+k", async ({ page }) => {
      await page.locator("body").press("ControlOrMeta+k");
      await expect(page.getByTestId("search-location-modal")).toBeVisible();
    });

    test("should open search modal by clicking on search bar", async ({
      page,
    }) => {
      await page.getByRole("textbox", { name: "Search City" }).click();
      await expect(page.getByTestId("search-location-modal")).toBeVisible();
    });
  });

  test.describe("Close search modal", () => {
    test("should close search modal by pressing escape key", async ({
      page,
    }) => {
      await page.getByRole("textbox", { name: "Search City" }).click();
      await page.locator("body").press("Escape");
      await expect(page.getByTestId("search-location-modal")).toBeHidden();
    });

    test("should close search modal by clicking on close button", async ({
      page,
    }) => {
      await page.getByRole("textbox", { name: "Search City" }).click();
      await page.getByRole("img").first().click();
      await expect(page.getByTestId("search-location-modal")).toBeHidden();
    });
  });

  test.describe("Search for a city", () => {
    for (const city of cities) {
      test(`should display the city on the list on the search modal by type in city name: ${city.typed}`, async ({
        page,
      }) => {
        await page.getByRole("textbox", { name: "Search City" }).click();
        await page
          .getByRole("textbox", { name: "Enter City Name" })
          .fill(city.typed);
        await page.waitForTimeout(2000);
        await expect(
          page.getByRole("heading", { name: city.candidate })
        ).toBeVisible();
      });
    }

    for (const city of cities) {
      test(`should display the weather information of the city by clicking the city name on the list on the search modal: ${city.typed}`, async ({
        page,
      }) => {
        await page.getByRole("textbox", { name: "Search City" }).click();
        await page
          .getByRole("textbox", { name: "Enter City Name" })
          .fill(city.typed);
        await page.waitForTimeout(2000);
        await page.getByRole("heading", { name: city.candidate }).click();
        await page.waitForTimeout(2000);
        await expect(page.getByTestId("city-name")).toHaveText(city.displayed);
        // await expect(
        //   page.getByRole("heading", { name: city.displayed })
        // ).toBeVisible();
      });
    }
  });
});
