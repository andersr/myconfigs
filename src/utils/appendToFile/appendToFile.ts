import fs from "fs-extra";

export const appendToFile = (path: string, value: string) => {
  try {
    fs.copySync(path, value);
    console.log(`Adding "${value}" to end of ${path} `);
  } catch (error) {
    console.error(error);
  }
};
