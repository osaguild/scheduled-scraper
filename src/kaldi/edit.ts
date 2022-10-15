import { Sale } from "./types";

const setIsNew = (oldSales: Sale[], newSales: Sale[]) => {
  // get all shopName to check new sale
  const oldSaleInfo = oldSales.map(
    (e) => `${e.shopName}_${e.saleFrom}_${e.saleTo}`
  );
  // add isNew flag to new rooms
  return newSales.map((e) =>
    oldSaleInfo.indexOf(`${e.shopName}_${e.saleFrom}_${e.saleTo}`) === -1
      ? ({ ...e, isNew: true } as Sale)
      : ({ ...e, isNew: false } as Sale)
  );
};

export { setIsNew };
