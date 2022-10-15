import { KaldiSaleInfo, Sale } from "../../../kaldi/types";
import { setIsNew } from "../../../kaldi/edit";
import {
  findFileNamesUnderDirectory,
  readFile,
  writeFile,
} from "../../../utils/file";

(async () => {
  const path = "./data/kaldi";
  const fileNames = findFileNamesUnderDirectory(path);
  let oldSales: Sale[] = [];
  fileNames.forEach((e) => {
    const saleInfo = readFile<KaldiSaleInfo>(`${path}/${e}`);
    const file: KaldiSaleInfo = {
      ...saleInfo,
      data: setIsNew(oldSales, saleInfo.data),
    };
    oldSales = saleInfo.data;
    writeFile(`${path}/${e}`, file);
  });
})();
