import fs from "fs";

const writeFile = (filePath: string, data: object) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const readFile = <T>(filePath: string): T => {
  return JSON.parse(fs.readFileSync(filePath).toString());
};

const readLatestFile = <T>(dir: string): T => {
  const fileNames = findFileNamesUnderDirectory(dir);
  const latestFileName = fileNames.sort().reverse()[0];
  return JSON.parse(fs.readFileSync(`${dir}/${latestFileName}`).toString());
};

const findFileNamesUnderDirectory = (dir: string) => {
  return fs.readdirSync(dir);
};

export { writeFile, readFile, readLatestFile, findFileNamesUnderDirectory };
