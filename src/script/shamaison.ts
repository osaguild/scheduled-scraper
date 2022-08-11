import { scraping } from "../shamaison";
import { getNowDate, writeFile } from "../utils";

(async () => {
  const apartments = await scraping();
  const filePath = `./data/shamaison/${getNowDate()}.json`;
  writeFile(filePath, apartments);
})();
