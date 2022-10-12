import "dotenv/config";
import { scraping } from "../shamaison/scraping";
import { setIsNew } from "../shamaison/edit";
import { findSearchableStations } from "../shamaison/station";
import { ShamaisonBuildingInfo } from "../shamaison/types";
import { driver } from "../utils/driver";
import { formatDateToYYYYMMDD, formatDateToString } from "../utils/date";
import { writeFile, readLatestFile } from "../utils/file";

(async () => {
  // get target station names from environment variable.
  const stationNames: string[] = JSON.parse(
    process.env.SHAMAISON_TARGET_STATIONS as string
  );
  const stations = await findSearchableStations(stationNames);
  const newBuildings = await scraping(driver, stations);
  await driver.quit();

  // get old buildings from latest file.
  const oldBuildings =
    readLatestFile<ShamaisonBuildingInfo>("./data/shamaison").data;

  // add new flag to new rooms
  const editedBuildings = setIsNew(oldBuildings, newBuildings);

  // write to file
  const filePath = `./data/shamaison/${formatDateToYYYYMMDD(new Date())}.json`;
  const file: ShamaisonBuildingInfo = {
    createdAt: formatDateToString(new Date()),
    stations: stations,
    data: editedBuildings,
  };
  writeFile(filePath, file);
})();
