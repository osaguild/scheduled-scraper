import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { Sale } from "./types";

/**
 * run scraping browser using selenium and get sale information from kaldi.
 */
export const scraping = async () => {
  const options = new chrome.Options().addArguments(
    "--headless",
    "--no-sandbox",
    "--disable-gpu"
  );

  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .setChromeService(
      new chrome.ServiceBuilder(
        "./node_modules/chromedriver/lib/chromedriver/chromedriver"
      )
    )
    .build();

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
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // get sale information at now
  const sales = await getSales();

  // need to close browser before return.
  await driver.quit();

  return sales;
};
