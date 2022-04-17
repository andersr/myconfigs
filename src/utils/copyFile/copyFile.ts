import fs from "fs-extra";

// TODO: turn into template util
export const copyFile = (sourcePath: string, targetPath: string) => {
  try {
    fs.copySync(sourcePath, targetPath);
    console.log("Add file: ", targetPath);
  } catch (error) {
    console.error(error);
  }
};
