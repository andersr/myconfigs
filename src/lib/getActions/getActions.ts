import { ActionConfig } from "../../models";
import fs from "fs-extra";

export const getActions = async (
  path: string
): Promise<{
  actions: ActionConfig[];
  //   actionsPath: string;
}> => {
  //   const homedir = require("os").homedir();
  //   const actionsPath = homedir + "/.myconfigs/actions";

  try {
    const folders = fs.readdirSync(path);

    const actions: ActionConfig[] = await Promise.all(
      folders.map(async (dirName) => {
        // const configPath = `${path}/${dirName}/config`; // ${homedir}/
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
      //   actionsPath,
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      actions: [],
      //   actionsPath: "",
    };
  }
};
