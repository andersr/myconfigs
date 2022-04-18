// import fs from "fs-extra";
// import shell from "shelljs";

// import {
//   ActionConfig,
//   AppendToFileAction,
//   CommandAction,
//   CopyFileAction,
//   NewFromTemplateAction,
// } from "../../models";
// import {
//   copyFile,
//   inputPrompt,
//   convertHandlebars,
//   readFile,
// } from "../../utils";

// export async function handleOutputs(
//   outputs: any[],
//   actionDir: string
// ): Promise<boolean> {
//   // const actionDir = actionPath + "/" + action.dirName;
//   for (let i = 0; i < outputs.length; i++) {
//     const type = outputs[i].type;
//     let step;
//     switch (type) {
//       case "command":
//         step = action.steps[i] as CommandAction;
//         if (!step || !step.command) {
//           console.error("No command found");
//           break;
//         }
//         console.log(`Running command: ${step.command}`);
//         shell.exec(step.command);
//         break;
//       case "copyFile":
//         step = action.steps[i] as CopyFileAction;
//         if (!step.source || !step.target) {
//           console.error("Missing file paths: cannot add file.");
//           break;
//         }
//         copyFile(actionDir + step.source, process.cwd() + step.target);
//         break;
//       case "newFromTemplate":
//         step = action.steps[i] as NewFromTemplateAction;
//         // TODO: move this to get all params values needed to complete all steps
//         response = response || (await inputPrompt(step.promptMessage));
//         if (!response) {
//           console.error("no input response");
//           return new Promise((resolve) => resolve(false));
//         }

//         const fileContent = readFile(actionDir + step.source);

//         const file = convertHandlebars(fileContent, {
//           name: response,
//         });

//         const path = convertHandlebars(process.cwd() + step.target, {
//           name: response,
//         });

//         // TODO: wrap in try/catch
//         await fs.outputFile(path, file);
//         console.log(`Adding file to: ${path}`);
//         break;
//       case "append":
//         step = action.steps[i] as AppendToFileAction;
//       // get templateFile, generate output, get targetFile, append output to targetFile
//       default:
//         console.log(`Unknown step type: ${type}`);
//         break;
//     }
//   }

//   return new Promise((resolve) => resolve(true));
// }
