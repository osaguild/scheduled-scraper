export interface Building {
  name: string;
  address: string;
  station: string;
  distance: string;
  yearBuilt: string;
  numberOfStairs: number;
  url: string;
  rooms: Room[];
}

export interface Room {
  roomNo: string;
  rent: number;
  floorPlan: string;
  space: number;
  url: string;
}

export interface OldBuilding {
  name: string;
  address: string;
  access: string;
  yearBuilt: string;
  numberOfStairs: string;
  url: string;
  rooms: OldRoom[];
}

export interface OldRoom {
  roomNo: string;
  rent: string;
  floorPlan: string;
  area: string;
  url: string;
}

export interface Station {
  name: string;
  url: string;
}

export interface File {
  createdAt: string;
  stations: string[];
  data: Building[];
}
