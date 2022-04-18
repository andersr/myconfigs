export interface CommandAction {
  type: "command";
  command: string;
}

export interface CopyFileAction {
  type: "copyFile";
  source: string;
  target: string;
}

export interface NewFromTemplateAction {
  type: "newFromTemplate";
  promptMessage: string;
  source: string;
  target: string;
}

export interface ActionConfig {
  dirName: string;
  name: string;
  steps: (CommandAction | CopyFileAction | NewFromTemplateAction)[];
}
