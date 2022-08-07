import { scraping } from "../kaldi";
import { getNowDate, writeFile } from "../utils";

(async () => {
  const sales = await scraping();
  const filePath = `./data/kaldi/${getNowDate()}.json`;
  writeFile(filePath, sales);
})();
