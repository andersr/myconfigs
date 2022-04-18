import { KeyValuePairs, NewFromTemplateAction } from "../../models";
import { convertHandlebars, readFile } from "../../utils";
import fs from "fs-extra";

interface NewFromTemplateArgs {
  action: NewFromTemplateAction;
  actionDir: string;
  inputs: KeyValuePairs;
}

export const handleNewFromTemplate = async ({
  action,
  actionDir,
  inputs,
}: NewFromTemplateArgs) => {
  try {
    const file = convertHandlebars(readFile(actionDir + action.source), inputs);
    const path = convertHandlebars(action.target, inputs);

    await fs.outputFile(process.cwd() + path, file);
    console.log(`Added file: ${path}`);
  } catch (error) {
    console.error(error);
  }
};
