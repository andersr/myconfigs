import shell from "shelljs";

import { ActionConfig, CommandAction, CopyFileAction } from "../models";
import { copyFile } from "../utils";

export function actionRunner(action: ActionConfig, actionPath: string): void {
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
      default:
        console.log(`Unknown step type: ${type}`);
        break;
    }
  }

  console.log(`Action "${action.name}" completed.`);
}
