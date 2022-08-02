import { scraping, selectSales } from "../kaldi/scraping";

(async () => {
  const sales = await scraping();
  console.log(sales)
  const selectedSales = selectSales(sales, "東京");
  console.log(selectedSales);
})();
