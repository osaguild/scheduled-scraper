import { driver } from "../common/driver";
import { scraping } from "../kaldi";
import { File } from "../kaldi/types";
import { formatDateToYYYYMMDD, formatDateToString, writeFile } from "../utils";

(async () => {
  const sales = await scraping(driver);
  await driver.quit();
  const filePath = `./data/kaldi/${formatDateToYYYYMMDD(new Date())}.json`;
  const file: File = { createdAt: formatDateToString(new Date()), data: sales };
  writeFile(filePath, file);
})();
