import { migrate, OldSale } from "../../kaldi/migrate";
import { KaldiSaleInfo } from "../../kaldi/scraping";
import { formatDateToString, formatYYYYMMDDToDate } from "../../utils/date";
import {
  readFile,
  writeFile,
  findFileNamesUnderDirectory,
} from "../../utils/file";

(async () => {
  const path = "./data/kaldi";
  const fileNames = findFileNamesUnderDirectory(path);
  fileNames.forEach(async (e) => {
    const oldSales = readFile<OldSale[]>(`${path}/${e}`);
    const file: KaldiSaleInfo = {
      createdAt: formatDateToString(formatYYYYMMDDToDate(e)),
      data: await migrate(oldSales),
    };
    writeFile(`${path}/${e}`, file);
  });
})();
