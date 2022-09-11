import prompts from "prompts";
import { ActionConfig } from "../../models";
import { actionRunner } from "../../runners/actionRunner";
import { getActions } from "../getActions/getActions";

// TODO validate generator files - is there a corresponding file for each source?  Does the target directory exist? - if invalid, report reason(s) and exclude from list
export const showActionsMenu = async (configsPath: string) => {
  const actionsPath = configsPath + "/actions";
  try {
    const { actions } = await getActions(actionsPath);

    if (actions.length === 0) {
      // TODO: display new action generator action
      console.log("No actions found");
      return;
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
  } catch (e) {
    console.log("show actions list error: ", e);
  }
};
