import { convertYearBuiltToDate } from "./convert";

jest.setTimeout(10000);

describe("convertYearBuiltToDate()", () => {
  it("[failed]not hit", async () => {
    const res = convertYearBuiltToDate("2022年10月下旬");
    const date = new Date(2022, 9, 1);
    expect(res).toStrictEqual(new Date(date.setHours(date.getHours() - 9)));
  });
});
