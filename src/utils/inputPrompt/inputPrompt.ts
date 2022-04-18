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
      validate: (input: string) => input.trim() !== "",
    },
  ]);

  return response.name;
};
