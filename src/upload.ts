import { Inputs } from "./inputs";
import { exec } from "@tradeshift/actions-exec";

export async function run(inputs: Inputs): Promise<void> {
  const res = await exec(
    "curl",
    [
      "-X",
      "POST",
      "-H",
      `"Content-Type:text/xml"`,
      "-d",
      `@${inputs.file}`,
      `"${inputs.server}/api/code-coverage/report?entity=component:default/${inputs.name}&coverageType=cobertura"`,
    ],
    false
  );

  if (res.stderr !== "" && !res.success) {
    throw new Error(`Error running gundeck: ${res.stderr}`);
  }
}
