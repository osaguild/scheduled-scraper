import { OldSale, Sale, KaldiSaleInfo } from "../../../kaldi/types";
import { convertStringToDateFromAndDateTo } from "../../../kaldi/convert";
import { formatDateToString, formatYYYYMMDDToDate } from "../../../utils/date";
import {
  readFile,
  writeFile,
  findFileNamesUnderDirectory,
} from "../../../utils/file";

const migrate = async (oldSales: OldSale[]) => {
  const promises = oldSales.map(async (e) => {
    // OldSale.salePerios -> Sale.saleFrom / Sale.saleTo
    const { saleFrom, saleTo } = convertStringToDateFromAndDateTo(e.salePeriod);
    const activeSale =
      e.activeSale === "開催中" ? "ACTIVE_SALE" : "SALE_NOTICE";
    return {
      activeSale: activeSale,
      shopName: e.shopName,
      shopAddress: e.shopAddress,
      saleName: e.saleName,
      saleFrom: formatDateToString(saleFrom),
      saleTo: formatDateToString(saleTo),
      saleDetail: e.saleDetail,
    } as Sale;
  });
  return await Promise.all(promises);
};

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
