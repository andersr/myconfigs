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
  isAppend,
}: NewFromTemplateArgs) => {
  try {
    const file = convertHandlebars(readFile(actionDir + action.source), inputs);
    const localPath = convertHandlebars(action.target, inputs);
    const fullPath = actionsPath + localPath;
    await fs.outputFile(fullPath, file);
    console.log(`Added file: ${localPath}`);
  } catch (error) {
    console.error(error);
  }
};
