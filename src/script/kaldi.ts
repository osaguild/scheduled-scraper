import { scraping, selectSales } from "../kaldi/scraping";
import { sendMessage, createMessage, sampleHttp } from "../kaldi/message";
import { testSales } from "../../test/data";

(async () => {
  /*
  const sales = await scraping();
  const selectedSales = selectSales(sales, "東京");
  const message = createMessage(selectedSales);
  */
  /*
  const message = createMessage(testSales);
  const status = await sendMessage(message);
  */
  const status = await sampleHttp();
  console.log("status :", status);
})();
