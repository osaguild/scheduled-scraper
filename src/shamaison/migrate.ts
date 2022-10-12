import { formatDateToString } from "../utils/date";
import { convertYearBuiltToDate } from "./convert";
import { OldBuilding, Room, Building } from "./types";

// migrate OldBuildings to Buildings
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

export { migrate };
