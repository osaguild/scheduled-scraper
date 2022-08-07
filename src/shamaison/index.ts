import { By } from "selenium-webdriver";
import { driver } from "../common/driver";
import { Apartment } from "./types";

export const scraping = async () => {
  // get apartment information on this page.
  const getApartments = async () => {
    const _listSearchBuildings = await driver.findElements(
      By.css(".listSearchBuilding")
    );
    const promises = _listSearchBuildings.map(async (e) => {
      // name
      const _listBoxInfo = await e.findElement(By.css(".listBoxInfo"));
      const _dt = await _listBoxInfo.findElement(By.css("dt"));
      const _dd = await _listBoxInfo.findElement(By.css("dd"));
      const _dls = await _dd.findElements(By.css("dl"));
      return {
        name: await _dt.findElement(By.css("a")).getText(),
        address: await _dls[0].findElement(By.css("dd")).getText(),
        access: await _dls[1].findElement(By.css("dd")).getText(),
        yearBuilt: await _dls[2].findElement(By.css("dd")).getText(),
        numberOfStairs: await _dls[3].findElement(By.css("dd")).getText(),
      } as Apartment;
    });
    return await Promise.all(promises);
  };

  // if can't go to next page, return false.
  const clickNext = async () => {
    try {
      const _listSearchA01Last = await driver.findElement(
        By.css(".listSearchA01Last")
      );
      const _pagerBoxA01 = await _listSearchA01Last.findElement(
        By.css(".pagerBoxA01")
      );
      const _ul = await _pagerBoxA01.findElement(By.css("ul"));
      await _ul.findElement(By.css("li.next")).click();
      return true;
    } catch (e) {
      return false;
    }
  };

  // target station url of shamaison.
  await driver.get(
    "https://www.shamaison.com/saitama/route/J002093/station/21982"
  );

  const apartments: Apartment[] = [];
  let loop: boolean;
  // get aparment information until there is no next page.
  do {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    apartments.push(...(await getApartments()));
    loop = await clickNext();
  } while (loop);

  // need to close browser before return.
  await driver.quit();

  return apartments;
};
