import { By, ThenableWebDriver } from "selenium-webdriver";
import { Sale } from "./types";

// run scraping browser using selenium and get sale information from kaldi.
export const scraping = async (driver: ThenableWebDriver) => {
  const getSales = async () => {
    const _table = await driver.findElement(By.css(".cz_sp_table"));
    const _tbody = await _table.findElement(By.css("tbody"));
    const _trs = await _tbody.findElements(By.css("tr"));
    const promises = _trs.map(async (e) => {
      const _td1 = await e.findElement(By.css("[itemprop='name']"));
      const shopName = await _td1.findElement(By.css("a")).getText();
      const activeSale = await e.findElement(By.css("span")).getText();
      const shopAddress = await e.findElement(By.css(".saleadress")).getText();
      const saleName = await e.findElement(By.css(".saletitle")).getText();
      const _td2 = await e.findElement(By.css("[itemprop='saledetail']"));
      const salePeriod = await _td2.findElement(By.css(".saledate")).getText();
      const saleDetail = await _td2
        .findElement(By.css(".saledetail"))
        .getText();
      return {
        activeSale,
        shopName,
        shopAddress,
        saleName,
        salePeriod,
        saleDetail,
      } as Sale;
    });
    return await Promise.all(promises);
  };

  // kaldi site redirect to current date page with the date automatically specified in the query string.
  await driver.get(
    "https://map.kaldi.co.jp/kaldi/articleList?account=kaldi&accmd=1&ftop=1&kkw001=2010-03-12T13%3A10%3A35"
  );

  // wait until the page is loaded.
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // get sale information at now
  const sales = await getSales();

  return sales;
};
