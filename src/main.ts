import { showActionsMenu } from "./lib";
import fs from "fs-extra";

// const BUCKET_NAME = "arco-myconfigs";
// import AWS from "aws-sdk";

// AWS.config.getCredentials(function (err) {
//   if (err) throw new Error(err.stack);
// });

// const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
// TODO: research how to integrate jsdoc
// TODO: add eslint w order imports

(async () => {
  const configsPath = process.cwd() + "/.myconfigs";
  if (!fs.existsSync(configsPath)) {
    console.log("no configs dir found");
    // TODO: display option to create local myconfigs dir and pull default configs
    return;
  }

  await showActionsMenu(configsPath);
})();
