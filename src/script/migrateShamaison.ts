import { getStations, migrate } from "../shamaison";
import { OldBuilding, File } from "../shamaison/types";
import {
  getAllFileNames,
  formatDateToString,
  formatYYYYMMDDToDate,
  readFile,
  writeFile,
} from "../utils";

(async () => {
  const path = "./data/shamaison";
  const fileNames = getAllFileNames(path);
  fileNames.forEach(async (fileName) => {
    const oldBuildings = readFile<OldBuilding[]>(`${path}/${fileName}`);
    const buildings = await migrate(oldBuildings);
    const file: File = {
      createdAt: formatDateToString(formatYYYYMMDDToDate(fileName)),
      stations: getStations(["浦和駅"]),
      data: buildings,
    };
    writeFile(`${path}/${fileName}`, file);
  });
})();
