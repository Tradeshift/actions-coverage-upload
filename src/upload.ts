import { Inputs } from "./inputs";
import { exec } from "@tradeshift/actions-exec";

export async function run(inputs: Inputs): Promise<void> {
  const res = await exec(
    "curl",
    [
      "-X",
      "POST",
      "-H",
      `Content-Type:text/xml`,
      "-d",
      `@${inputs.file}`,
      "--fail-with-body",
      `${inputs.server}/api/code-coverage/report?entity=component:default/${inputs.name}&coverageType=${inputs.type}`,
    ],
    false
  );

  if (res.stderr !== "" && !res.success) {
    throw new Error(`Error uploading coverage: ${res.stderr}`);
  }
}
