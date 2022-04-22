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
  // promptMessage: string;
  source: string;
  target: string;
}

export interface NewGeneratorAction {
  type: "newGenerator";
  // promptMessage: string;
  source: string;
  target: string;
}
export interface AppendToFileAction {
  type: "append";
  source: string;
  target: string;
}

export interface ActionInput {
  key: string;
  message: string;
  required?: boolean;
}

export interface ActionConfig {
  dirName: string;
  name: string;
  description?: string;
  inputs: ActionInput[];
  outputs: (
    | CommandAction
    | CopyFileAction
    | NewFromTemplateAction
    | AppendToFileAction
    | NewGeneratorAction
  )[];
}
