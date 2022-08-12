import { driver } from "../src/common/driver";
import { scraping } from "../src/kaldi";

jest.setTimeout(60000);

describe("kaldi", () => {
  it("scraping", async () => {
    const sales = await scraping(driver);
    await driver.quit();
    expect(sales.length).toBeGreaterThan(0);
  });
});
