import { ShamaisonBuildingInfo, OldBuilding } from "../../shamaison/types";
import { migrate } from "../../shamaison/migrate";
import { findSearchableStations } from "../../shamaison/station";
import { formatDateToString, formatYYYYMMDDToDate } from "../../utils/date";
import {
  findFileNamesUnderDirectory,
  readFile,
  writeFile,
} from "../../utils/file";

(async () => {
  const path = "./data/shamaison";
  const fileNames = findFileNamesUnderDirectory(path);
  fileNames.forEach(async (e) => {
    const oldBuildings = readFile<OldBuilding[]>(`${path}/${e}`);
    const file: ShamaisonBuildingInfo = {
      createdAt: formatDateToString(formatYYYYMMDDToDate(e)),
      stations: findSearchableStations(["浦和駅"]),
      data: await migrate(oldBuildings),
    };
    writeFile(`${path}/${e}`, file);
  });
})();
