export interface CommandAction {
  type: "command";
  command: string;
}

export interface CopyFileAction {
  type: "copyFile";
  source: string;
  target: string;
}

export interface ActionConfig {
  name: string;
  steps: (CommandAction | CopyFileAction)[];
}
