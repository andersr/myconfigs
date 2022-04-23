import { ActionConfig } from "~/models";
import fs from "fs-extra";

export const getActions = async (): Promise<{
  actions: ActionConfig[];
  actionsPath: string;
}> => {
  const homedir = require("os").homedir();
  const actionsPath = homedir + "/.myconfigs/actions";

  try {
    const folders = fs.readdirSync(actionsPath);

    const actions: ActionConfig[] = await Promise.all(
      folders.map(async (dirName) => {
        const path = `.myconfigs/actions/${dirName}/config`; // ${homedir}/
        const config = await import(path);

        return {
          dirName,
          ...config,
          name: dirName.replaceAll("_", " "),
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
