import fs from "fs-extra";
import prompts from "prompts";
import { ActionConfig } from "./models";
import { actionRunner } from "./runners/actionRunner";

const getActions = async (): Promise<{
  actions: ActionConfig[];
  actionsPath: string;
}> => {
  const homedir = require("os").homedir();
  const actionsPath = homedir + "/.myconfigs/actions";

  try {
    const folders = fs.readdirSync(actionsPath);

    const actions: ActionConfig[] = await Promise.all(
      folders.map(async (dirName) => {
        const path = `${homedir}/.myconfigs/actions/${dirName}/config`;
        const config = await import(path);

        return {
          dirName,
          ...config,
        };
      })
    );

    return {
      actions,
      actionsPath,
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      actions: [],
      actionsPath: "",
    };
  }
};

// TODO: research how to integrate jsdoc

(async () => {
  try {
    const { actions, actionsPath } = await getActions();

    if (actions.length === 0) {
      throw new Error("No actions found");
    }

    const choices = actions?.map((action: ActionConfig, index: number) => ({
      title: action.name,
      //   description: "This option has a description",
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

    if (response?.index) {
      await actionRunner(actions[response.index], actionsPath);
      // TODO: do not display message if action is cancelled
      console.log(`Action "${actions[response.index].name}" completed.`);
    }

    // need to invoke this inside the target repo
  } catch (e) {
    console.log("e: ", e);
    // Deal with the fact the chain failed
  }
})();
