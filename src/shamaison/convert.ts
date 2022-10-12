// format: 2022年10月下旬 -> Date, timezone: UTC+9:00 -> UTC
const convertYearBuiltToDate = (yearBuilt: string) => {
  const [y, m] = yearBuilt.split(/[年月]/);
  const date = new Date(Number(y), Number(m) - 1);
  date.setHours(date.getHours() - 9);
  return date;
};

export { convertYearBuiltToDate };
