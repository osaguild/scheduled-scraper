import "dotenv/config";
import { driver } from "../common/driver";
import { scraping } from "../shamaison";
import { File } from "../shamaison/types";
import { formatDateToYYYYMMDD, formatDateToString, writeFile } from "../utils";

(async () => {
  // get target station names from environment variable.
  const stationNames: string[] = JSON.parse(
    process.env.SHAMAISON_TARGET_STATIONS as string
  );
  const buildings = await scraping(driver, stationNames);
  await driver.quit();
  const filePath = `./data/shamaison/${formatDateToYYYYMMDD(new Date())}.json`;
  const file: File = {
    createdAt: formatDateToString(new Date()),
    stations: stationNames,
    data: buildings,
  };
  writeFile(filePath, file);
})();
