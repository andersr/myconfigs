import prompts from "prompts";

// TODO: turn into template util
export const inputPrompt = async (
  message: string
): Promise<string | undefined> => {
  const response = await prompts([
    {
      type: "text",
      name: "name",
      message: message || "Name?",
      // TODO: validate that string is not empty
      validate: (input: string) => input.trim() !== "",
    },
  ]);

  return response.name;
};

// Receive user input. Should return true if the value is valid, and an error message String otherwise. If false is returned, a default error message is shown
