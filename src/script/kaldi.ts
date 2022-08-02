import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

export const scraping = async () => {
  const options = new chrome.Options().addArguments(
    "--headless",
    "--no-sandbox",
    "--disable-gpu"
  );

  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .setChromeService(new chrome.ServiceBuilder("./drivers/v103/linux.exe"))
    .build();

  await driver.get(
    "https://map.kaldi.co.jp/kaldi/articleList?account=kaldi&accmd=1&ftop=1&kkw001=2022-08-01T00%3A00%3A00"
  );

  await new Promise((resolve) => setTimeout(resolve, 3000));
  const _es = await driver.findElements(By.className("saledate"));
  const promises = _es.map(async (e, i) => {
    return e.getText();
  });
  const saleDates = await Promise.all(promises);

  await driver.quit();

  return saleDates;
};

scraping().then((saleDates) => {
  console.log(saleDates);
});
