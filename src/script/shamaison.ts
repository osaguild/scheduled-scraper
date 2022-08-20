import "dotenv/config";
import { driver } from "../utils/driver";
import { scraping, ShamaisonBuildingInfo } from "../shamaison/scraping";
import { findSearchableStations } from "../shamaison/station";
import { formatDateToYYYYMMDD, formatDateToString } from "../utils/date";
import { writeFile } from "../utils/file";

(async () => {
  // get target station names from environment variable.
  const stationNames: string[] = JSON.parse(
    process.env.SHAMAISON_TARGET_STATIONS as string
  );
  const stations = await findSearchableStations(stationNames);
  const buildings = await scraping(driver, stations);
  await driver.quit();
  const filePath = `./data/shamaison/${formatDateToYYYYMMDD(new Date())}.json`;
  const file: ShamaisonBuildingInfo = {
    createdAt: formatDateToString(new Date()),
    stations: stations,
    data: buildings,
  };
  writeFile(filePath, file);
})();
