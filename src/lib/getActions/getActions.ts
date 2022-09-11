import { ActionConfig } from "../../models";
import fs from "fs-extra";

const DOT_FILE_REGEX = /^\..*/;

export const getActions = async (
  path: string
): Promise<{
  actions: ActionConfig[];
}> => {

  try {
    const folders = fs.readdirSync(path).filter((folder: string) => !folder.match(DOT_FILE_REGEX));
  
    const actions: ActionConfig[] = await Promise.all(
      folders.map(async (dirName) => {
        const config = await import(`${path}/${dirName}/config`);

        return {
          dirName,
          ...config,
          name: dirName.replaceAll("_", " "),
        };
      })
    );

    return {
      actions,
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      actions: [],
    };
  }
};
