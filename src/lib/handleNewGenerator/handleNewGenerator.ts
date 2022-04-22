import { KeyValuePairs, NewFromTemplateAction } from "../../models";
import { convertHandlebars, readFile } from "../../utils";
import fs from "fs-extra";

interface NewFromTemplateArgs {
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
}: NewFromTemplateArgs) => {
  try {
    const file = convertHandlebars(readFile(actionDir + action.source), inputs);
    const localPath = convertHandlebars(action.target, inputs);
    const fullPath = actionsPath + localPath;
    // TODO: add this check to other templates
    const fileExists = fs.existsSync(fullPath);
    if (fileExists) {
      // TODO: prevent this from displaying on cancel
      console.log(
        `Sorry, a generator by the name "${inputs["name"]}" already exists. Please try a different name. `
      );
      return;
    }
    await fs.outputFile(fullPath, file, function (err) {
      if (err) {
        console.log(err);
      }
    });
    console.log(`Added file: ${localPath}`);
  } catch (error) {
    console.error(error);
  }
};
