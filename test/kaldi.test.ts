import { scraping } from "../src/script/kaldi";

jest.setTimeout(60000);

describe("selenium", () => {
  it("test", async () => {
    const saleDates = await scraping();
    expect(saleDates[0]).toBe("2022年7月28日(木) ～ 2022年8月3日(水)");
  });
});
