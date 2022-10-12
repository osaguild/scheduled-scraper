type Sale = {
  activeSale: ActiveSale;
  shopName: string;
  shopAddress: string;
  saleName: string;
  saleFrom: string;
  saleTo: string;
  saleDetail: string;
};

type KaldiSaleInfo = {
  createdAt: string;
  data: Sale[];
};

// for migration
type OldSale = {
  activeSale: string;
  shopName: string;
  shopAddress: string;
  saleName: string;
  salePeriod: string;
  saleDetail: string;
};

type ActiveSale = "ACTIVE _SALE" | "SALE_NOTICE";

export { Sale, KaldiSaleInfo, OldSale, ActiveSale };
