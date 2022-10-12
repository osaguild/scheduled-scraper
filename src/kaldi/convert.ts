// format: 2022年8月1日(月) ～ 2022年8月7日(日) -> Date(from) / Date(to)
// timezone: UTC+9:00 -> UTC
const convertStringToDateFromAndDateTo = (salesPeriod: string) => {
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

export { convertStringToDateFromAndDateTo };
