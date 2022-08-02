# scheduled-scraper

scraping library for data provider

# about chrome driver

- version is 103. download site is [here](https://chromedriver.storage.googleapis.com/index.html?path=103.0.5060.134/)
- downloaded two types of drivers, one is linux for github actions and other is m1 mac for local development. drivers path is below.
  - linux: `./drivers/v103/linux.exe`
  - mac: `./drivers/v103/mac_m1.exe`
- if you run script on local and your os doesn't match above, you have to download driver.
- if you are mac user, you have to run script to approve to run driver like below.
  - `xattr -d com.apple.quarantine chromedriver`

# command

```
yarn add typescript ts-node ts-jest chromedriver@103.0.0 @types/selenium-webdriver selenium-webdriver @types/jest @types/node jest -D
npx tsc --init

yarn run-kaldi
yarn test
```
