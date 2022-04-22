import fs from "fs-extra";

export const fileExists = (fullPath: string, message: string): boolean => {
  if (fs.existsSync(fullPath)) {
    console.log(message);
    return true;
  }
  return false;
};
