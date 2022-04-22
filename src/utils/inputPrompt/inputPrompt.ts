import prompts from "prompts";
import { ActionInput } from "../../models";

// TODO: turn into template util
export const inputPrompt = async (
  input: ActionInput
): Promise<string | undefined> => {
  try {
    const response = await prompts([
      {
        type: "text",
        name: "name",
        message: input.message || "Name?",
        validate: input.required
          ? (input: string) => input.trim() !== ""
          : undefined,
      },
    ]);
    return response.name;
  } catch (error) {
    console.error("error: ", error);
  }
};
