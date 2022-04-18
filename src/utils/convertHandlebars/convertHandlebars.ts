import Handlebars from "handlebars";

type KVPairs = { [key: string]: string };

// TODO: add tests for all these
// TODO: rename to be about template not a file necessarily
Handlebars.registerHelper("pascalCase", function (str: string) {
  // src: https://quickref.me/convert-a-string-to-pascal-case
  return (str.match(/[a-zA-Z0-9]+/g) || [])
    .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
    .join("");
});

export const convertHandlebars = (content: string, params: KVPairs) => {
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
