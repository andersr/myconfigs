import fs from "fs-extra";
import shell from "shelljs";

import {
  ActionConfig,
  CommandAction,
  CopyFileAction,
  NewFromTemplateAction,
} from "../models";
import { copyFile, inputPrompt, convertHandlebars, readFile } from "../utils";

export async function actionRunner(action: ActionConfig, actionPath: string) {
  console.log(`Running action: ${action.name}`);
  const actionDir = actionPath + "/" + action.dirName;
  for (let i = 0; i < action.steps.length; i++) {
    const type = action.steps[i].type;
    let step;
    switch (type) {
      case "command":
        step = action.steps[i] as CommandAction;
        if (!step || !step.command) {
          console.error("No command found");
          break;
        }
        console.log(`Running command: ${step.command}`);
        shell.exec(step.command);
        break;
      case "copyFile":
        step = action.steps[i] as CopyFileAction;
        if (!step.source || !step.target) {
          console.error("Missing file paths: cannot add file.");
          break;
        }
        copyFile(actionDir + step.source, process.cwd() + step.target);
        break;
      case "newFromTemplate":
        step = action.steps[i] as NewFromTemplateAction;
        const response = await inputPrompt(step.promptMessage);
        if (!response) {
          console.error("no input response ");
          return;
        }

        const fileContent = readFile(actionDir + step.source);

        const file = convertHandlebars(fileContent, {
          name: response,
        });

        const path = convertHandlebars(process.cwd() + step.target, {
          name: response,
        });

        // TODO: wrap in try/catch, add console message with path to where file was added
        await fs.outputFile(path, file);
        break;
      default:
        console.log(`Unknown step type: ${type}`);
        break;
    }
  }
}
