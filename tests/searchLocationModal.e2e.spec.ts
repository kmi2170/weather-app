import { test, expect } from "@playwright/test";

const cities = [
  {
    typed: "paris",
    candidate: "Paris, Île-de-France, Paris, France",
    displayedCity: "Paris,",
    displayedRegion: "Île-de-France",
    displayedCountry: "France",
  },
  {
    typed: "paris",
    candidate: "Paris, Texas, Lamar, United States",
    displayedCity: "Paris,",
    displayedRegion: "Texas",
    displayedCountry: "United States",
  },
  {
    typed: "paris",
    candidate: "Paris, Tennessee, Henry, United States",
    displayedCity: "Paris,",
    displayedRegion: "Tennessee",
    displayedCountry: "United States",
  },
];

/**
 * On parallel runs, test might fail because of many API calls at one time
 */
test.describe.configure({ mode: "serial" });

test.beforeEach("open page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox", { name: "Search City" }).click();
  await page
    .getByRole("textbox", { name: "Enter City Name" })
    .fill(cities[0].typed);
  await page.waitForTimeout(2000);
});

test.describe("Search Location Modal", () => {
  test.describe("Should display the city by clicking on the candidate on the list", () => {
    test(`should display the weather information of the first city on the list`, async ({
      page,
    }) => {
      await page.getByRole("heading", { name: cities[0].candidate }).click();
      await page.waitForTimeout(2000);
      await expect(page.getByTestId("city-name")).toHaveText(
        cities[0].displayedCity
      );
      await expect(page.getByTestId("region-name")).toHaveText(
        cities[0].displayedRegion
      );
      await expect(page.getByTestId("country-name")).toHaveText(
        cities[0].displayedCountry
      );
    });
    test(`should display the weather information of the second city on the list`, async ({
      page,
    }) => {
      await page.getByRole("heading", { name: cities[1].candidate }).click();
      await page.waitForTimeout(2000);
      await expect(page.getByTestId("city-name")).toHaveText(
        cities[1].displayedCity
      );
      await expect(page.getByTestId("region-name")).toHaveText(
        cities[1].displayedRegion
      );
      await expect(page.getByTestId("country-name")).toHaveText(
        cities[1].displayedCountry
      );
    });
    test(`should display the weather information of the third city on the list`, async ({
      page,
    }) => {
      await page.getByRole("heading", { name: cities[2].candidate }).click();
      await page.waitForTimeout(2000);
      await expect(page.getByTestId("city-name")).toHaveText(
        cities[2].displayedCity
      );
      await expect(page.getByTestId("region-name")).toHaveText(
        cities[2].displayedRegion
      );
      await expect(page.getByTestId("country-name")).toHaveText(
        cities[2].displayedCountry
      );
    });
  });

  test.describe("Should display the city by selecting the candidate on the list and pressing enter", () => {
    test(`should display the weather information of the first city on the list`, async ({
      page,
    }) => {
      await page.locator("body").press("Enter");
      await page.waitForTimeout(2000);
      await expect(page.getByTestId("city-name")).toHaveText(
        cities[0].displayedCity
      );
      await expect(page.getByTestId("region-name")).toHaveText(
        cities[0].displayedRegion
      );
      await expect(page.getByTestId("country-name")).toHaveText(
        cities[0].displayedCountry
      );
    });
    test(`should display the weather information of the second city on the list`, async ({
      page,
    }) => {
      await page.locator("body").press("ArrowDown");
      await page.waitForTimeout(500);
      await page.locator("body").press("Enter");
      await page.waitForTimeout(2000);
      await expect(page.getByTestId("city-name")).toHaveText(
        cities[1].displayedCity
      );
      await expect(page.getByTestId("region-name")).toHaveText(
        cities[1].displayedRegion
      );
      await expect(page.getByTestId("country-name")).toHaveText(
        cities[1].displayedCountry
      );
    });
    test(`should display the weather information of the third city on the list`, async ({
      page,
    }) => {
      await page.locator("body").press("ArrowDown");
      await page.locator("body").press("ArrowDown");
      await page.locator("body").press("Enter");
      await page.waitForTimeout(2000);
      await expect(page.getByTestId("city-name")).toHaveText(
        cities[2].displayedCity
      );
      await expect(page.getByTestId("region-name")).toHaveText(
        cities[2].displayedRegion
      );
      await expect(page.getByTestId("country-name")).toHaveText(
        cities[2].displayedCountry
      );
    });
  });
});
