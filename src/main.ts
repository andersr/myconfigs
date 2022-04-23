import prompts from "prompts";
import { getActions } from "./lib";
import { ActionConfig } from "./models";
import { actionRunner } from "./runners/actionRunner";

// TODO: set myconfig location globally
// TODO: research how to integrate jsdoc
// TODO: add eslint w order imports

(async () => {
  try {
    const { actions, actionsPath } = await getActions();

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
      // if inputValues.length > 0 get all values and store
      // change steps to outputs

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
