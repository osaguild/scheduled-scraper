import fs from "fs";

// timezone is UTC
export const getNowDate = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = ("00" + (now.getMonth() + 1)).slice(-2);
  const d = ("00" + now.getDate()).slice(-2);
  return y + m + d;
};

export const writeFile = (filePath: string, data: object) => {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (e) => {
    if (e) {
      console.log("[failed]file is not created.");
      throw e;
    }
    console.log(`[success]file is created. path: ${filePath}`);
  });
};
