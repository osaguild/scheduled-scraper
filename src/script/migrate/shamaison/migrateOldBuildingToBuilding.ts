import {
  ShamaisonBuildingInfo,
  OldBuilding,
  Room,
  Building,
} from "../../../shamaison/types";
import { findSearchableStations } from "../../../shamaison/station";
import { convertYearBuiltToDate } from "../../../shamaison/convert";
import { formatDateToString, formatYYYYMMDDToDate } from "../../../utils/date";
import {
  findFileNamesUnderDirectory,
  readFile,
  writeFile,
} from "../../../utils/file";

const migrate = async (oldBuildings: OldBuilding[]) => {
  const promises = oldBuildings.map(async (b) => {
    const station = b.access.split(" ")[1];
    const distance = b.access.split(" ")[2];
    const yearBuilt = formatDateToString(convertYearBuiltToDate(b.yearBuilt));
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
      name: b.name,
      address: b.address,
      station,
      distance,
      yearBuilt,
      numberOfStairs,
      url: b.url,
      rooms,
    } as Building;
  });
  return await Promise.all(promises);
};

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
