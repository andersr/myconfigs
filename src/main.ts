import fs from "fs";
import prompts from "prompts";
import { ActionConfig } from "./models";
import { actionRunner } from "./runners/actionRunner";

const getActions = async function () {
  const homedir = require("os").homedir();

  try {
    const folders = fs.readdirSync(homedir + "/.myconfigs/actions");

    const actions: ActionConfig[] = await Promise.all(
      folders.map(async (folder) => {
        const path = `${homedir}/.myconfigs/actions/${folder}/config`;
        const config = await import(path);

        return {
          id: folder,
          ...config,
        };
      })
    );

    return actions;
  } catch (error) {
    console.log("error: ", error);
  }
};

// TODO: research how to integrate jsdoc

(async () => {
  try {
    const actions = await getActions();
    console.log("actions: ", actions);

    if (!actions) {
      throw new Error("No actions found");
    }

    const choices = actions?.map((action, index) => ({
      title: action.name,
      //   description: "This option has a description",
      index,
    }));

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
      actionRunner(actions[response.index]);
    }

    // need to invoke this inside the target repo
  } catch (e) {
    console.log("e: ", e);
    // Deal with the fact the chain failed
  }
})();
