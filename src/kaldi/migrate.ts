import { Sale } from "./scraping";
import { convertStringToDateFromAndDateTo } from "./convert";
import { formatDateToString } from "../utils/date";

type OldSale = {
  activeSale: string;
  shopName: string;
  shopAddress: string;
  saleName: string;
  salePeriod: string;
  saleDetail: string;
};

// migrate OldSales to Sales
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

export { OldSale, migrate };
