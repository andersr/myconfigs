import { KeyValuePairs, NewFromTemplateAction } from "../../models";
import { convertHandlebars, readFile } from "../../utils";
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
    const file = convertHandlebars(readFile(actionDir + action.source), inputs);
    const localPath = convertHandlebars(action.target, inputs);
    const fullPath = process.cwd() + localPath;
    if (isAppend) {
      const exists = fs.existsSync(fullPath);
      await fs.ensureFile(fullPath);
      await fs.writeFile(fullPath, `${exists ? "\n" : ""}${file}`, {
        flag: "a",
      });
      console.log(`Appended to: ${localPath}`);
      return;
    }
    await fs.outputFile(fullPath, file);
    console.log(`Added file: ${localPath}`);
  } catch (error) {
    console.error(error);
  }
};
