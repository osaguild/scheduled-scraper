import { By, ThenableWebDriver } from "selenium-webdriver";
import { convertStringToDateFromAndDateTo } from "./convert";
import { formatDateToString } from "../utils/date";
import { Sale } from "./types";

const KALDI_SALE_URI =
  "https://map.kaldi.co.jp/kaldi/articleList?account=kaldi&accmd=1&ftop=1&kkw001=2010-03-12T13%3A10%3A35";

// run scraping using selenium
const scraping = async (driver: ThenableWebDriver) => {
  // get sale information at now
  const getSales = async () => {
    const _table = await driver.findElement(By.css(".cz_sp_table"));
    const _tbody = await _table.findElement(By.css("tbody"));
    const _trs = await _tbody.findElements(By.css("tr"));
    const promises = _trs.map(async (e) => {
      const _td1 = await e.findElement(By.css("[itemprop='name']"));
      const shopName = await _td1.findElement(By.css("a")).getText();
      const _activeSale = await e.findElement(By.css("span")).getText();
      const shopAddress = await e.findElement(By.css(".saleadress")).getText();
      const saleName = await e.findElement(By.css(".saletitle")).getText();
      const _td2 = await e.findElement(By.css("[itemprop='saledetail']"));
      const _salePeriod = await _td2.findElement(By.css(".saledate")).getText();
      const saleDetail = await _td2
        .findElement(By.css(".saledetail"))
        .getText();
      // change searchable format
      const { saleFrom, saleTo } =
        convertStringToDateFromAndDateTo(_salePeriod);
      const activeSale =
        _activeSale === "開催中" ? "ACTIVE_SALE" : "SALE_NOTICE";
      return {
        activeSale,
        shopName,
        shopAddress,
        saleName,
        saleFrom: formatDateToString(saleFrom),
        saleTo: formatDateToString(saleTo),
        saleDetail,
      } as Sale;
    });
    return await Promise.all(promises);
  };
  // kaldi site redirect to current date page with the date automatically specified in the query string.
  await driver.get(KALDI_SALE_URI);
  // wait until the page is loaded.
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return await getSales();
};

export { scraping };
