import shell from "shelljs";

import { ActionConfig, CommandAction } from "../models";

export function actionRunner(action: ActionConfig): void {
  console.log(`Running action: ${action.name}`);

  for (let i = 0; i < action.steps.length; i++) {
    const type = action.steps[i].type;
    switch (type) {
      case "command":
        const step = action.steps[i] as CommandAction;
        if (!step || !step.command) {
          console.error("No command found");
          break;
        }
        console.log(`Running command: ${step.command}`);
        // shell.exec(step.command);
        break;
      case "copyFile":
        console.log("copyFile: ");
        // copyFileCommandRunner()
        break;
      default:
        console.log(`Unknown step type: ${type}`);
        break;
    }
  }

  console.log(`Action "${action.name}" completed.`);
}
