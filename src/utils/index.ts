import fs from "fs";

// format: YYYYMMDD , timezone: UTC+9:00
export const formatDateToYYYYMMDD = (date: Date) => {
  date.setHours(date.getHours() + 9);
  const y = date.getFullYear();
  const m = ("00" + (date.getMonth() + 1)).slice(-2);
  const d = ("00" + date.getDate()).slice(-2);
  return y + m + d;
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

export const writeFile = (filePath: string, data: object) => {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (e) => {
    if (e) {
      console.log("[failed]file is not created.");
      throw e;
    }
    console.log(`[success]file is created. path: ${filePath}`);
  });
};

export const formatArea = (area: string) => {
  // （30.00m2） -> 30.00m²
  const _area = area.slice(1).slice(0, -2).concat("²");
  return _area;
};
