import { convertStringToDateFromAndDateTo } from "./convert";

jest.setTimeout(60000);

describe("convertStringToDateFromAndDateTo()", () => {
  it("[success]", async () => {
    const { saleFrom, saleTo } = convertStringToDateFromAndDateTo(
      "2022年8月1日(月) ～ 2022年8月7日(日)"
    );
    const from = new Date(2022, 7, 1);
    const to = new Date(2022, 7, 7);
    expect(saleFrom).toStrictEqual(
      new Date(from.setHours(from.getHours() - 9))
    );
    expect(saleTo).toStrictEqual(new Date(to.setHours(to.getHours() - 9)));
  });
});
