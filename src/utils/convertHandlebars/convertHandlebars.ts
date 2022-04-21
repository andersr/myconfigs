import Handlebars from "handlebars";
import camelCase from "lodash.camelCase";
import { KeyValuePairs } from "../../models";

// TODO: add tests for all these
// TODO: rename to be about template not a file necessarily
Handlebars.registerHelper("pascalCase", function (str: string) {
  // src: https://quickref.me/convert-a-string-to-pascal-case
  return (str.match(/[a-zA-Z0-9]+/g) || [])
    .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
    .join("");
});

Handlebars.registerHelper("camelCase", function (str: string) {
  return camelCase(str);
});

Handlebars.registerHelper("spaceToUnderscore", function (str: string) {
  return str.replaceAll(" ", "_");
});

export const convertHandlebars = (content: string, params: KeyValuePairs) => {
  // TODO: handle read error, register pascalcase helper
  try {
    const template = Handlebars.compile(content);
    return template(params);
  } catch (error) {
    // TODO: is this needed?
    console.log(
      "Sorry, there was a problem converting the template file,  ",
      error
    );
    return "";
  }
};
