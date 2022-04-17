import Handlebars from "handlebars";
import fs from "fs-extra";

export const readFile = (path: string): string => {
  // TODO: handle read error, register pascalcase helper
  try {
    const source = fs.readFileSync(path, "utf8");
    return source.toString();
  } catch (error) {
    // TODO: cleaner error message - use errorMessage util - another generator
    console.log(
      "Sorry, there was a problem creating the templates file,  ",
      error
    );
    return "";
  }
};
