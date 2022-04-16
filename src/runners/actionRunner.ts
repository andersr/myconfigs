import shell from "shelljs";

import { ActionConfig, CommandAction } from "../models";

export function actionRunner(action: ActionConfig): void {
  console.log(`*** Running ${action.name} ****`);

  for (let i = 0; i < action.steps.length; i++) {
    const type = action.steps[i].type;
    switch (type) {
      case "command":
        const step = action.steps[i] as CommandAction;
        if (!step || !step.command) {
          console.error("No command found");
          break;
        }
        shell.exec(step.command);
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
}
