import { scraping, selectSales } from "../src/kaldi/scraping";
import { testSales, testSelectedSales } from "./data";

jest.setTimeout(60000);

describe("kaldi", () => {
  it("scraping", async () => {
    const sales = await scraping();
    expect(sales.length).toBeGreaterThan(0);
  });
  it("selectSales", async () => {
    const selectedSales = selectSales(testSales, "東京");
    expect(selectedSales).toStrictEqual(testSelectedSales);
  });
});
