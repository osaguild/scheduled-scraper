import { By, ThenableWebDriver, WebElement } from "selenium-webdriver";
import { Building, Room, Station, OldBuilding } from "./types";
import { getDateFromYearBuilt, formatDateToString } from "../utils";

// get station urls from searchable stations.
export const getStations = (_stationNames: string[]) => {
  const searchableStations: Station[] = [
    { name: "浦和駅", url: "/saitama/route/J002093/station/21982" },
    { name: "大宮駅", url: "/saitama/route/J002093/station/21987" },
    { name: "川越駅", url: "/saitama/route/J002045/station/22012" },
  ];

  const stations = _stationNames
    .map((e) => {
      for (const station of searchableStations) {
        if (e === station.name) return station;
      }
      console.log(`[WARN]${e} isn't included in searchable stations.`);
    })
    .filter((e): e is Exclude<typeof e, undefined> => e !== undefined);
  return stations;
};

export const scraping = async (
  driver: ThenableWebDriver,
  stationNames: string[]
) => {
  // get building information on this page.
  const getBuildings = async () => {
    // click accordion to show all building information.
    const clickAccordion = async (tableBoxA01: WebElement) => {
      try {
        // .listSearchBuildings > .tableBoxA01 > .accArea
        await tableBoxA01.findElement(By.css(".accArea")).click();
      } catch (e) {
        return;
      }
    };

    // get room information in building.
    const getRooms = async (trs: WebElement[]) => {
      const promises = trs.map(async (e) => {
        // .listSearchBuildings > .tableBoxA01 > .listBoxDetail > tbody > tr > td
        const _tds = await e.findElements(By.css("td"));
        return {
          roomNo: (await _tds[0].findElement(By.css("a")).getText()).slice(
            0,
            -2
          ),
          rent: Number((await _tds[1].getText()).slice(0, -2)),
          floorPlan: await _tds[2].findElement(By.css(".text01")).getText(),
          space: Number(
            (await _tds[2].findElement(By.css(".tabBlock")).getText())
              .slice(1)
              .slice(0, -3)
          ),
          url: await _tds[0].findElement(By.css("a")).getAttribute("href"),
        } as Room;
      });
      return await Promise.all(promises);
    };

    const _listSearchBuildings = await driver.findElements(
      By.css(".listSearchBuilding")
    );

    const promises = _listSearchBuildings.map(async (e) => {
      // .listSearchBuildings > .listBoxInfo
      const _listBoxInfo = await e.findElement(By.css(".listBoxInfo"));
      // .listSearchBuildings > .listBoxInfo > dt
      const _dt = await _listBoxInfo.findElement(By.css("dt"));
      // .listSearchBuildings > .listBoxInfo > dd
      const _dd = await _listBoxInfo.findElement(By.css("dd"));
      // .listSearchBuildings > .listBoxInfo > dd > dl
      const _dls = await _dd.findElements(By.css("dl"));

      // .listSearchBuildings > .tableBoxA01
      const _tableBoxA01 = await e.findElement(By.css(".tableBoxA01"));

      await clickAccordion(_tableBoxA01);

      // .listSearchBuildings > .tableBoxA01 > .listBoxDetail
      const _listBoxDetail = await _tableBoxA01.findElement(
        By.css(".listBoxDetail")
      );
      // .listSearchBuildings > .tableBoxA01 > .listBoxDetail > tbody
      const _tbody = await _listBoxDetail.findElement(By.css("tbody"));
      // .listSearchBuildings > .tableBoxA01 > .listBoxDetail > tbody > tr
      const _trs = await _tbody.findElements(By.css("tr"));

      // remove top row, which is not building information.
      _trs.shift();
      const rooms = await getRooms(_trs);

      return {
        name: await _dt.findElement(By.css("a")).getText(),
        address: await _dls[0].findElement(By.css("dd")).getText(),
        station: (await _dls[1].findElement(By.css("dd")).getText()).split(
          " "
        )[1],
        distance: (await _dls[1].findElement(By.css("dd")).getText()).split(
          " "
        )[2],
        yearBuilt: formatDateToString(
          getDateFromYearBuilt(
            await _dls[2].findElement(By.css("dd")).getText()
          )
        ),
        numberOfStairs: Number(
          (await _dls[3].findElement(By.css("dd")).getText()).slice(0, -3)
        ),
        url: await _dt.findElement(By.css("a")).getAttribute("href"),
        rooms: rooms,
      } as Building;
    });
    return await Promise.all(promises);
  };

  // if has next page go there, if not return false.
  const hasNextPage = async () => {
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

  const stations = getStations(stationNames);
  const building: Building[] = [];
  if (stations.length !== 0) {
    // get building information each station and push to array.
    for (const station of stations) {
      // go target station page.
      await driver.get(`https://www.shamaison.com${station.url}`);
      // get building information until there is no next page.
      do {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        building.push(...(await getBuildings()));
      } while (await hasNextPage());
    }
  }
  // delete duplicated building information when specified multiple stations.
  const deduplicatedBuilding = Array.from(new Set(building));

  return deduplicatedBuilding;
};

export const migrate = async (oldBuildings: OldBuilding[]) => {
  const promises = oldBuildings.map(async (b) => {
    const station = b.access.split(" ")[1];
    const distance = b.access.split(" ")[2];
    const yearBuilt = formatDateToString(getDateFromYearBuilt(b.yearBuilt));
    const numberOfStairs = Number(b.numberOfStairs.slice(0, -3));
    const rooms = b.rooms.map((r) => {
      const roomNo = r.roomNo.slice(0, -2);
      const rent = Number(r.rent.slice(0, -2));
      const space = Number(r.area.slice(0, -2));
      return {
        roomNo,
        rent,
        floorPlan: r.floorPlan,
        space,
        url: b.url,
      } as Room;
    });

    return {
      ...b,
      station,
      distance,
      yearBuilt,
      numberOfStairs,
      rooms,
    } as Building;
  });
  return await Promise.all(promises);
};
