// format: Date -> YYYYMMDD, timezone: UTC -> UTC+9:00
const formatDateToYYYYMMDD = (date: Date) => {
  date.setHours(date.getHours() + 9);
  const y = date.getFullYear();
  const m = ("00" + (date.getMonth() + 1)).slice(-2);
  const d = ("00" + date.getDate()).slice(-2);
  return y + m + d;
};

// format: YYYYMMDD.json -> Date, timezone: UTC+9:00 -> UTC
const formatYYYYMMDDToDate = (str: string) => {
  const date = new Date(
    Number(str.substring(0, 4)),
    Number(str.substring(4, 6)) - 1,
    Number(str.substring(6, 8))
  );
  date.setHours(date.getHours() - 9);
  return date;
};

// format: Date -> YYYY-MM-DDThh:mm:ss+09:00, timezone: UTC -> UTC+9:00
const formatDateToString = (date: Date) => {
  date.setHours(date.getHours() + 9);
  const y = date.getFullYear();
  const m = ("00" + (date.getMonth() + 1)).slice(-2);
  const d = ("00" + date.getDate()).slice(-2);
  const h = ("00" + date.getHours()).slice(-2);
  const mi = ("00" + date.getMinutes()).slice(-2);
  const s = ("00" + date.getSeconds()).slice(-2);
  return `${y}-${m}-${d}T${h}:${mi}:${s}+09:00`;
};

export { formatDateToYYYYMMDD, formatYYYYMMDDToDate, formatDateToString };
