// timezone is UTC
export const getNowDate = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = ("00" + (now.getMonth() + 1)).slice(-2);
  const d = ("00" + now.getDate()).slice(-2);
  return y + m + d;
};
