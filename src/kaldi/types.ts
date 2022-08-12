export interface Sale {
  activeSale: string;
  shopName: string;
  shopAddress: string;
  saleName: string;
  salePeriod: string;
  saleDetail: string;
}

export interface File {
  createdAt: string;
  data: Sale[];
}
