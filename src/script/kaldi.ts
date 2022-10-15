import { driver } from "../utils/driver";
import { scraping } from "../kaldi/scraping";
import { KaldiSaleInfo } from "../kaldi/types";
import { writeFile, readLatestFile } from "../utils/file";
import { formatDateToYYYYMMDD, formatDateToString } from "../utils/date";
import { setIsNew } from "../kaldi/edit";

(async () => {
  // scraping
  const newSales = await scraping(driver);
  await driver.quit();

  // get old sale info from latest file.
  const oldSales = readLatestFile<KaldiSaleInfo>("./data/kaldi").data;

  // add new flag to new sales
  const editedSales = setIsNew(oldSales, newSales);

  // write to file
  const filePath = `./data/kaldi/${formatDateToYYYYMMDD(new Date())}.json`;
  const file: KaldiSaleInfo = {
    createdAt: formatDateToString(new Date()),
    data: editedSales,
  };
  writeFile(filePath, file);
})();
