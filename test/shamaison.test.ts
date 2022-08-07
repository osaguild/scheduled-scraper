import { scraping } from "../src/shamaison";

jest.setTimeout(60000);

describe("shamaison", () => {
  it("scraping", async () => {
    const apartments = await scraping();
    expect(apartments.length).toBeGreaterThan(0);
  });
});
