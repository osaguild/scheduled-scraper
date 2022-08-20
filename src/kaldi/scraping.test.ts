import { driver } from "../utils/driver";
import { scraping } from "./scraping";

jest.setTimeout(60000);

describe("scraping()", () => {
  it("[success]", async () => {
    const sales = await scraping(driver);
    await driver.quit();
    expect(sales.length).toBeGreaterThan(0);
  });
});
