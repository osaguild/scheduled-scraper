import { driver } from "../utils/driver";
import { scraping } from "./scraping";
import { Station } from "./types";

jest.setTimeout(180000);

describe("scraping()", () => {
  afterAll(async () => {
    await driver.quit();
  });
  it("[failed]not specify station]", async () => {
    const apartments = await scraping(driver, []);
    expect(apartments.length).toBe(0);
  });
  it("[success]specify correct and incorrect stations]", async () => {
    const stations: Station[] = [
      { name: "浦和駅", url: "/saitama/route/J002093/station/21982" },
      { name: "大宮駅", url: "/saitama/route/J002093/station/21987" },
      { name: "川越駅", url: "/saitama/route/J002045/station/22012" },
    ];
    const apartments = await scraping(driver, stations);
    expect(apartments.length).toBeGreaterThan(0);
  });
});
