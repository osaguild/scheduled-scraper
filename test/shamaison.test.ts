import { driver } from "../src/common/driver";
import { scraping } from "../src/shamaison";

jest.setTimeout(180000);

describe("shamaison 1", () => {
  afterAll(async () => {
    await driver.quit();
  });
  it("[success]specify correct stations]", async () => {
    const req = ["浦和駅", "大宮駅", "川越駅"];
    const apartments = await scraping(driver, req);
    expect(apartments.length).toBeGreaterThan(0);
  });
  it("[success]specify correct and incorrect stations]", async () => {
    const req = ["浦和駅", "池袋駅", "大宮駅"];
    const apartments = await scraping(driver, req);
    expect(apartments.length).toBeGreaterThan(0);
  });
  it("[failed]specify incorrect stations]", async () => {
    const req = ["新宿駅", "池袋駅", "東京駅"];
    const apartments = await scraping(driver, req);
    expect(apartments.length).toBe(0);
  });
});
