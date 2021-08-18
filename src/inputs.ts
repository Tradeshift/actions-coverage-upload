import * as core from "@actions/core";

export interface Inputs {
  name: string;
  server: string;
  file: string;
}

export async function getInputs(): Promise<Inputs> {
  const inputs: Inputs = {
    name: core.getInput("name"),
    server: core.getInput("server"),
    file: core.getInput("file"),
  };
  return inputs;
}
