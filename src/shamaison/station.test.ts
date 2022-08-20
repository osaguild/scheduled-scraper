import { findSearchableStations } from "./station";

jest.setTimeout(10000);

describe("findSearchableStations()", () => {
  it("[failed]not hit", async () => {
    const res = findSearchableStations(["東京駅", "新宿駅"]);
    expect(res.length).toBe(0);
  });

  it("[success]hit single station", async () => {
    const res = findSearchableStations(["浦和駅", "新宿駅"]);
    expect(res.length).toBe(1);
    expect(res[0].name).toBe("浦和駅");
  });

  it("[success]hit multiple stations", async () => {
    const res = findSearchableStations(["浦和駅", "大宮駅"]);
    expect(res.length).toBe(2);
    expect(res[0].name).toBe("浦和駅");
    expect(res[1].name).toBe("大宮駅");
  });
});
