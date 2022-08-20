import chrome from "selenium-webdriver/chrome";
import { Builder } from "selenium-webdriver";

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

export { driver };
