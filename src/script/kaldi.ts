import { driver } from "../common/driver";
import { scraping } from "../kaldi";
import { getNowDate, writeFile } from "../utils";

(async () => {
  const sales = await scraping(driver);
  await driver.quit();
  const filePath = `./data/kaldi/${getNowDate()}.json`;
  writeFile(filePath, sales);
})();
