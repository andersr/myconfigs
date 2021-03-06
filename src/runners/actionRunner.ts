import shell from "shelljs";
import {
  getInputValues,
  handleNewFromTemplate,
  handleNewGenerator,
} from "../lib";

import {
  ActionConfig,
  CommandAction,
  CopyFileAction,
  KeyValuePairs,
  NewFromTemplateAction,
} from "../models";
import { copyFile } from "../utils";

export async function actionRunner(
  action: ActionConfig,
  actionsPath: string
): Promise<boolean> {
  console.log(`Running action: ${action.name}`);
  let inputs: KeyValuePairs = {};

  const actionDir = actionsPath + "/" + action.dirName;

  if (action?.inputs?.length > 0) {
    inputs = await getInputValues(action.inputs);
  }

  // TOO: move to outputFiles
  for (let i = 0; i < action.outputs?.length; i++) {
    const type = action.outputs[i].type;
    let step;
    switch (type) {
      case "command":
        step = action.outputs[i] as CommandAction;
        if (!step || !step.command) {
          console.error("No command found");
          break;
        }
        console.log(`Running command: ${step.command}`);
        shell.exec(step.command);
        break;
      case "copyFile":
        step = action.outputs[i] as CopyFileAction;
        if (!step.source || !step.target) {
          console.error("Missing file paths: cannot add file.");
          break;
        }
        copyFile(actionDir + step.source, process.cwd() + step.target);
        break;
      case "newFromTemplate":
        await handleNewFromTemplate({
          action: action.outputs[i] as NewFromTemplateAction,
          actionDir,
          inputs,
        });
        break;
      case "append":
        await handleNewFromTemplate({
          action: action.outputs[i] as NewFromTemplateAction,
          actionDir,
          inputs,
          isAppend: true,
        });
        break;
      case "newGenerator":
        await handleNewGenerator({
          action: action.outputs[i] as NewFromTemplateAction,
          actionDir,
          actionsPath,
          inputs,
        });
        break;
      default:
        console.log(`Unknown step type: ${type}`);
        break;
    }
  }

  return new Promise((resolve) => resolve(true));
}
