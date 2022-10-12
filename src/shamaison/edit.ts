import { Building, Room } from "./types";

const setIsNew = (oldBuildings: Building[], newBuildings: Building[]) => {
  // get all rooms.url to check new room
  const oldUrls = oldBuildings.flatMap((e) => e.rooms.map((r) => r.url));
  // add isNew flag to new rooms
  return newBuildings.map(
    (e) =>
      ({
        ...e,
        rooms: e.rooms.map((r) =>
          oldUrls.indexOf(r.url) === -1
            ? ({ ...r, isNew: true } as Room)
            : ({ ...r, isNew: false } as Room)
        ),
      } as Building)
  );
};

export { setIsNew };
