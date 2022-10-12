import { setIsNew } from "./edit";

jest.setTimeout(10000);

describe("addNewFlag()", () => {
  it("[success]check isNew", async () => {
    const buildings = setIsNew(oldBuildings, newBuildings);
    expect(buildings.length).toBe(3);
    expect(buildings[0].rooms.length).toBe(2);
    expect(buildings[0].rooms[0].isNew).toBe(false);
    expect(buildings[0].rooms[1].isNew).toBe(false);
    expect(buildings[1].rooms.length).toBe(2);
    expect(buildings[1].rooms[0].isNew).toBe(false);
    expect(buildings[1].rooms[1].isNew).toBe(true);
    expect(buildings[2].rooms.length).toBe(3);
    expect(buildings[2].rooms[0].isNew).toBe(false);
    expect(buildings[2].rooms[1].isNew).toBe(false);
    expect(buildings[2].rooms[2].isNew).toBe(true);
  });
});

const oldBuildings = [
  {
    name: "物件A",
    address: "東京都新宿区xxx",
    station: "新宿駅",
    distance: "徒歩10分",
    yearBuilt: "2022-10-01T00:00:00+09:00",
    numberOfStairs: 3,
    url: "https://www.shamaison.com/tokyo/area/001/001/",
    rooms: [
      {
        roomNo: "101",
        rent: 10.0,
        floorPlan: "1LDK",
        space: 50.0,
        url: "https://www.shamaison.com/tokyo/area/001/001/101",
        isNew: true,
      },
      {
        roomNo: "201",
        rent: 12.0,
        floorPlan: "2LDK",
        space: 60.0,
        url: "https://www.shamaison.com/tokyo/area/001/001/201",
      },
      {
        roomNo: "301",
        rent: 15.0,
        floorPlan: "3LDK",
        space: 75.0,
        url: "https://www.shamaison.com/tokyo/area/001/001/301",
        isNew: false,
      },
    ],
  },
  {
    name: "物件B",
    address: "東京都豊島区xxx",
    station: "池袋駅",
    distance: "徒歩10分",
    yearBuilt: "2022-10-01T00:00:00+09:00",
    numberOfStairs: 3,
    url: "https://www.shamaison.com/tokyo/area/002/001/",
    rooms: [
      {
        roomNo: "102",
        rent: 10.0,
        floorPlan: "1LDK",
        space: 50.0,
        url: "https://www.shamaison.com/tokyo/area/002/001/102",
        isNew: true,
      },
    ],
  },
  {
    name: "物件C",
    address: "埼玉県さいたま市xxx",
    station: "浦和駅",
    distance: "徒歩10分",
    yearBuilt: "2022-10-01T00:00:00+09:00",
    numberOfStairs: 3,
    url: "https://www.shamaison.com/saitama/area/001/001/",
    rooms: [
      {
        roomNo: "201",
        rent: 12.0,
        floorPlan: "2LDK",
        space: 60.0,
        url: "https://www.shamaison.com/saitama/area/001/001/201",
      },
      {
        roomNo: "301",
        rent: 15.0,
        floorPlan: "3LDK",
        space: 75.0,
        url: "https://www.shamaison.com/saitama/area/001/001/301",
        isNew: false,
      },
    ],
  },
];

const newBuildings = [
  {
    name: "物件A",
    address: "東京都新宿区xxx",
    station: "新宿駅",
    distance: "徒歩10分",
    yearBuilt: "2022-10-01T00:00:00+09:00",
    numberOfStairs: 3,
    url: "https://www.shamaison.com/tokyo/area/001/001/",
    rooms: [
      {
        roomNo: "101",
        rent: 10.0,
        floorPlan: "1LDK",
        space: 50.0,
        url: "https://www.shamaison.com/tokyo/area/001/001/101",
      },
      {
        roomNo: "301",
        rent: 15.0,
        floorPlan: "3LDK",
        space: 75.0,
        url: "https://www.shamaison.com/tokyo/area/001/001/301",
      },
    ],
  },
  {
    name: "物件B",
    address: "東京都豊島区xxx",
    station: "池袋駅",
    distance: "徒歩10分",
    yearBuilt: "2022-10-01T00:00:00+09:00",
    numberOfStairs: 3,
    url: "https://www.shamaison.com/tokyo/area/002/001/",
    rooms: [
      {
        roomNo: "102",
        rent: 10.0,
        floorPlan: "1LDK",
        space: 50.0,
        url: "https://www.shamaison.com/tokyo/area/002/001/102",
      },
      {
        roomNo: "103",
        rent: 15.0,
        floorPlan: "3LDK",
        space: 75.0,
        url: "https://www.shamaison.com/tokyo/area/002/001/103", // new
      },
    ],
  },
  {
    name: "物件C",
    address: "埼玉県さいたま市xxx",
    station: "浦和駅",
    distance: "徒歩10分",
    yearBuilt: "2022-10-01T00:00:00+09:00",
    numberOfStairs: 3,
    url: "https://www.shamaison.com/saitama/area/001/001/",
    rooms: [
      {
        roomNo: "201",
        rent: 12.0,
        floorPlan: "2LDK",
        space: 60.0,
        url: "https://www.shamaison.com/saitama/area/001/001/201",
      },
      {
        roomNo: "301",
        rent: 15.0,
        floorPlan: "3LDK",
        space: 75.0,
        url: "https://www.shamaison.com/saitama/area/001/001/301",
      },
      {
        roomNo: "302",
        rent: 15.0,
        floorPlan: "3LDK",
        space: 75.0,
        url: "https://www.shamaison.com/saitama/area/001/001/302", // new
      },
    ],
  },
];
