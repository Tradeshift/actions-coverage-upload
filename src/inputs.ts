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
  };
  return inputs;
}
