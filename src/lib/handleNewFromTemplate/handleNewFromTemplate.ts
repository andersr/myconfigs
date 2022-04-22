import { KeyValuePairs, NewFromTemplateAction } from "../../models";
import { appendToFile, convertHandlebars, readFile } from "../../utils";
import fs from "fs-extra";

interface NewFromTemplateArgs {
  action: NewFromTemplateAction;
  actionDir: string;
  inputs: KeyValuePairs;
  isAppend?: boolean;
}

export const handleNewFromTemplate = async ({
  action,
  actionDir,
  inputs,
  isAppend,
}: NewFromTemplateArgs) => {
  try {
    const file = convertHandlebars(
      readFile(actionDir + "/templates/" + action.source),
      inputs
    );
    const localPath = convertHandlebars(action.target, inputs);
    const fullPath = process.cwd() + localPath;
    if (isAppend) {
      await appendToFile({ fullPath, localPath, file });
      return;
    }
    await fs.outputFile(fullPath, file);
    console.log(`Added file: ${localPath}`);
  } catch (error) {
    console.error(error);
  }
};
