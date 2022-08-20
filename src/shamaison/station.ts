type Station = {
  name: string;
  url: string;
};

const searchableStations: Station[] = [
  { name: "浦和駅", url: "/saitama/route/J002093/station/21982" },
  { name: "大宮駅", url: "/saitama/route/J002093/station/21987" },
  { name: "川越駅", url: "/saitama/route/J002045/station/22012" },
];

const findSearchableStations = (stationNames: string[]) => {
  return searchableStations
    .map((e) => (stationNames.indexOf(e.name) !== -1 ? e : undefined))
    .filter((e): e is Exclude<typeof e, undefined> => e !== undefined);
};

export { findSearchableStations, Station };
