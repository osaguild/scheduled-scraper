import { setIsNew } from "./edit";
import { Sale } from "./types";

jest.setTimeout(10000);

describe("addNewFlag()", () => {
  it("[success]check isNew", async () => {
    const sales = setIsNew(oldSales, newSales);
    expect(sales.length).toBe(3);
    expect(sales[0].isNew).toBe(false);
    expect(sales[1].isNew).toBe(false);
    expect(sales[2].isNew).toBe(true);
  });
});

const oldSales: Sale[] = [
  {
    activeSale: "ACTIVE_SALE",
    shopName: "ショップA",
    shopAddress: "東京都渋谷区xx",
    saleName: "10周年記念セール",
    saleFrom: "2022-10-01T00:00:00+09:00",
    saleTo: "2022-10-07T00:00:00+09:00",
    saleDetail: "コーヒー豆特別価格（一部除外品あり）／商品10%OFF",
    isNew: true,
  },
  {
    activeSale: "ACTIVE_SALE",
    shopName: "ショップB",
    shopAddress: "東京都渋谷区xx",
    saleName: "10周年記念セール",
    saleFrom: "2022-10-01T00:00:00+09:00",
    saleTo: "2022-10-07T00:00:00+09:00",
    saleDetail: "コーヒー豆特別価格（一部除外品あり）／商品10%OFF",
    isNew: false,
  },
  {
    activeSale: "ACTIVE_SALE",
    shopName: "ショップC",
    shopAddress: "東京都渋谷区xx",
    saleName: "10周年記念セール",
    saleFrom: "2022-10-01T00:00:00+09:00",
    saleTo: "2022-10-07T00:00:00+09:00",
    saleDetail: "コーヒー豆特別価格（一部除外品あり）／商品10%OFF",
  },
];

const newSales: Sale[] = [
  {
    activeSale: "ACTIVE_SALE",
    shopName: "ショップA",
    shopAddress: "東京都渋谷区xx",
    saleName: "10周年記念セール",
    saleFrom: "2022-10-01T00:00:00+09:00",
    saleTo: "2022-10-07T00:00:00+09:00",
    saleDetail: "コーヒー豆特別価格（一部除外品あり）／商品10%OFF",
  },
  {
    activeSale: "ACTIVE_SALE",
    shopName: "ショップC",
    shopAddress: "東京都渋谷区xx",
    saleName: "10周年記念セール",
    saleFrom: "2022-10-01T00:00:00+09:00",
    saleTo: "2022-10-07T00:00:00+09:00",
    saleDetail: "コーヒー豆特別価格（一部除外品あり）／商品10%OFF",
  },
  {
    activeSale: "ACTIVE_SALE",
    shopName: "ショップD",
    shopAddress: "東京都渋谷区xx",
    saleName: "10周年記念セール",
    saleFrom: "2022-10-01T00:00:00+09:00",
    saleTo: "2022-10-07T00:00:00+09:00",
    saleDetail: "コーヒー豆特別価格（一部除外品あり）／商品10%OFF",
  },
];
