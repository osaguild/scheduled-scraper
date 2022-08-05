import { scraping } from "../src/kaldi/scraping";

jest.setTimeout(60000);

describe("kaldi", () => {
  it("scraping", async () => {
    const sales = await scraping();
    expect(sales.length).toBeGreaterThan(0);
  });
});
