import { ActionInput, KeyValuePairs } from "../../models";
import { inputPrompt } from "../../utils";

export async function getInputValues(inputs: ActionInput[]) {
  let responses: KeyValuePairs = {};

  for (let i = 0; i < inputs.length; i++) {
    const response = await inputPrompt(inputs[i].message);
    if (response) {
      responses[inputs[i].key] = response;
    }
  }

  return responses;
}
