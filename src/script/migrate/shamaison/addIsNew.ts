import { ShamaisonBuildingInfo, Building } from "../../../shamaison/types";
import { setIsNew } from "../../../shamaison/edit";
import {
  findFileNamesUnderDirectory,
  readFile,
  writeFile,
} from "../../../utils/file";

(async () => {
  const path = "./data/shamaison";
  const fileNames = findFileNamesUnderDirectory(path);
  let oldBuildings: Building[] = [];
  fileNames.forEach((e) => {
    const buildingInfo = readFile<ShamaisonBuildingInfo>(`${path}/${e}`);
    const file: ShamaisonBuildingInfo = {
      ...buildingInfo,
      data: setIsNew(oldBuildings, buildingInfo.data),
    };
    oldBuildings = buildingInfo.data;
    writeFile(`${path}/${e}`, file);
  });
})();
