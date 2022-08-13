import { migrate } from "../kaldi";
import { OldSale, File } from "../kaldi/types";
import {
  getAllFileNames,
  formatDateToString,
  formatYYYYMMDDToDate,
  readFile,
  writeFile,
} from "../utils";

(async () => {
  const path = "./data/kaldi";
  const fileNames = getAllFileNames(path);
  fileNames.forEach(async (fileName) => {
    const oldSales = readFile<OldSale[]>(`${path}/${fileName}`);
    const sales = await migrate(oldSales);
    const file: File = {
      createdAt: formatDateToString(formatYYYYMMDDToDate(fileName)),
      data: sales,
    };
    writeFile(`${path}/${fileName}`, file);
  });
})();
