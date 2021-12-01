import * as core from "@actions/core";

export enum CoverageType {
  cobertura = "cobertura",
  jacoco = "jacoco",
}

export interface Inputs {
  name: string;
  server: string;
  file: string;
  type: CoverageType;

  ca: string;
  cert: string;
  key: string;
}

export async function getInputs(): Promise<Inputs> {
  const coverageType: CoverageType = (<never>CoverageType)[
    core.getInput("type")
  ];
  const inputs: Inputs = {
    name: core.getInput("name"),
    server: core.getInput("server"),
    file: core.getInput("file"),
    type: coverageType,
    ca: core.getInput("ca-cert"),
    cert: core.getInput("client-cert"),
    key: core.getInput("client-key"),
  };
  return inputs;
}
