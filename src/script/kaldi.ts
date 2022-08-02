import { scraping, selectSales } from "../kaldi/scraping";
import { sendMessage, createMessage } from "../kaldi/message";

(async () => {
  const sales = await scraping();
  const selectedSales = selectSales(sales, "東京");
  const message = createMessage(selectedSales);
  await sendMessage(message);
})();
