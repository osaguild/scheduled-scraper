import fs from "fs";

// format: YYYYMMDD , timezone: UTC+9:00
export const formatDateToYYYYMMDD = (date: Date) => {
  date.setHours(date.getHours() + 9);
  const y = date.getFullYear();
  const m = ("00" + (date.getMonth() + 1)).slice(-2);
  const d = ("00" + date.getDate()).slice(-2);
  return y + m + d;
};

// timezone: UTC
export const formatYYYYMMDDToDate = (str: string) => {
  const date = new Date(
    Number(str.substring(0, 4)),
    Number(str.substring(4, 6)) - 1,
    Number(str.substring(6, 8))
  );
  date.setHours(date.getHours() - 9);
  return date;
};

// format: 	YYYY-MM-DDThh:mm:ssTZD , timezone: UTC+9:00
export const formatDateToString = (date: Date) => {
  date.setHours(date.getHours() + 9);
  const y = date.getFullYear();
  const m = ("00" + (date.getMonth() + 1)).slice(-2);
  const d = ("00" + date.getDate()).slice(-2);
  const h = ("00" + date.getHours()).slice(-2);
  const mi = ("00" + date.getMinutes()).slice(-2);
  const s = ("00" + date.getSeconds()).slice(-2);
  return `${y}-${m}-${d}T${h}:${mi}:${s}+09:00`;
};

export const formatStringToDate = (str: string) => {
  return Date.parse(str);
};

// timezone: UTC
export const getDateFromSalesPeriod = (salesPeriod: string) => {
  const toDate = (sDate: string) => {
    const [y, m, d] = sDate.split(/[年月日]/);
    return new Date(Number(y), Number(m) - 1, Number(d));
  };
  const [_saleFrom, _saleTo] = salesPeriod.split(" ～ ");
  const saleFrom = toDate(_saleFrom);
  const saleTo = toDate(_saleTo);
  saleFrom.setHours(saleFrom.getHours() - 9);
  saleTo.setHours(saleTo.getHours() - 9);

  return { saleFrom, saleTo };
};

// timezone: UTC
export const getDateFromYearBuilt = (yearBuilt: string) => {
  const [y, m] = yearBuilt.split(/[年月]/);
  const date = new Date(Number(y), Number(m) - 1);
  date.setHours(date.getHours() - 9);
  return date;
};

export const writeFile = (filePath: string, data: object) => {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (e) => {
    if (e) {
      console.log(`[failed]${filePath} isn't created.`);
      throw e;
    }
    console.log(`[success]${filePath} is created.`);
  });
};

export const getAllFileNames = (dir: string) => {
  return fs.readdirSync(dir);
};

export const readFile = <T>(filePath: string): T => {
  return JSON.parse(fs.readFileSync(filePath).toString());
};
