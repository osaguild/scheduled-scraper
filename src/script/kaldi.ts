import { driver } from "../utils/driver";
import { scraping, KaldiSaleInfo } from "../kaldi/scraping";
import { writeFile } from "../utils/file";
import { formatDateToYYYYMMDD, formatDateToString } from "../utils/date";

(async () => {
  const sales = await scraping(driver);
  await driver.quit();
  const filePath = `./data/kaldi/${formatDateToYYYYMMDD(new Date())}.json`;
  const file: KaldiSaleInfo = {
    createdAt: formatDateToString(new Date()),
    data: sales,
  };
  writeFile(filePath, file);
})();
