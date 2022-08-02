export interface Sale {
  activeSale: string;
  shopName: string;
  shopAddress: string;
  saleName: string;
  salePeriod: string;
  saleDetail: string;
}

export interface Request {
  messages: Message[];
}
export interface Message {
  type: string;
  text: string;
}
