import fs from "fs-extra";

interface AppendFileArgs {
  fullPath: string;
  localPath: string;
  file: string;
}

export const appendToFile = async ({
  fullPath,
  localPath,
  file,
}: AppendFileArgs) => {
  try {
    const exists = fs.existsSync(fullPath);
    await fs.ensureFile(fullPath);
    await fs.writeFile(fullPath, `${exists ? "\n" : ""}${file}`, {
      flag: "a",
    });
    console.log(`Appended to: ${localPath}`);
  } catch (error) {
    console.error(error);
  }
};
