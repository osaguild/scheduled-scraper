import { scraping } from "../kaldi/scraping";
import { getNowDate } from "../utils";
import fs from "fs";

(async () => {
  const sales = await scraping();
  const filePath = `./data/kaldi/${getNowDate()}.json`;
  fs.writeFile(filePath, JSON.stringify(sales, null, 2), (e) => {
    if (e) {
      console.log("[failed]file is not created.");
      throw e;
    }
    console.log(`[success]file is created. path: ${filePath}`);
  });
})();
