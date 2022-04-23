import { KeyValuePairs, NewFromTemplateAction } from "../../models";
import { convertHandlebars, fileExists, readFile } from "../../utils";
import fs from "fs-extra";
interface Args {
  action: NewFromTemplateAction;
  actionDir: string;
  actionsPath: string;
  inputs: KeyValuePairs;
  isAppend?: boolean;
}

export const handleNewGenerator = async ({
  action,
  actionDir,
  actionsPath,
  inputs,
}: Args) => {
  try {
    // ask for output files - what directory should this file be in?
    const file = convertHandlebars(readFile(actionDir + action.source), inputs);
    const localPath = convertHandlebars(action.target, inputs);
    const fullPath = actionsPath + localPath;
    // TODO: add this check to other templates
    // TODO: prevent this from displaying on cancel
    if (
      fileExists(
        fullPath,
        `Sorry, a generator by the name "${inputs["name"]}" already exists. Please try a different name. `
      )
    ) {
      return;
    }

    fs.outputFile(fullPath, file, function (err) {
      if (err) {
        console.log(err);
      }
    });
    console.log(`Added file: ${localPath}`);
  } catch (error) {
    console.error(error);
  }
};
