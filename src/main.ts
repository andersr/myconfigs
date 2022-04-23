import prompts from "prompts";
import { getActions } from "./lib";
import { ActionConfig } from "./models";
import { actionRunner } from "./runners/actionRunner";
import fs from "fs-extra";

// import AWS from "aws-sdk";

// AWS.config.getCredentials(function (err) {
//   if (err) throw new Error(err.stack);
// });

// const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
// TODO: research how to integrate jsdoc
// TODO: add eslint w order imports

(async () => {
  const configsPath = process.cwd() + "/.myconfigs";
  if (!fs.existsSync(configsPath)) {
    // console.log(`Found .myconfigs directory`);
    console.log("no configs dir found");
    return;
  }
  const actionsPath = configsPath + "/actions";
  try {
    const { actions } = await getActions(actionsPath);

    if (actions.length === 0) {
      throw new Error("No actions found");
    }

    const choices = actions?.map((action: ActionConfig, index: number) => ({
      title: action.name,
      description: action.description,
      index,
    }));

    // TODO: is this needed?
    const onCancel = () => {
      console.log("Action cancelled.");
      return true;
    };

    const response = await prompts(
      [
        {
          type: "select",
          name: "index",
          message: "Please select an action to run",
          choices,
        },
      ],
      { onCancel }
    );

    if (typeof response?.index === "number") {
      const success = await actionRunner(actions[response.index], actionsPath);
      // TODO: this message is displaying on cancel of the action
      if (success) {
        console.log(`Action "${actions[response.index].name}" completed.`);
      } else {
        console.log(
          `Unable to complete the action "${actions[response.index].name}"`
        );
      }
    }

    // need to invoke this inside the target repo
  } catch (e) {
    console.log("e: ", e);
    // Deal with the fact the chain failed
  }
})();
