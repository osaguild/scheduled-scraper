type Building = {
  name: string;
  address: string;
  station: string;
  distance: string;
  yearBuilt: string;
  numberOfStairs: number;
  url: string;
  rooms: Room[];
};

type Room = {
  roomNo: string;
  rent: number;
  floorPlan: string;
  space: number;
  url: string;
};

type ShamaisonBuildingInfo = {
  createdAt: string;
  stations: Station[];
  data: Building[];
};

type Station = {
  name: string;
  url: string;
};

// for migration
type OldBuilding = {
  name: string;
  address: string;
  access: string;
  yearBuilt: string;
  numberOfStairs: string;
  url: string;
  rooms: OldRoom[];
};

// for migration
type OldRoom = {
  roomNo: string;
  rent: string;
  floorPlan: string;
  area: string;
  url: string;
};

export { Building, Room, ShamaisonBuildingInfo, Station, OldBuilding, OldRoom };
