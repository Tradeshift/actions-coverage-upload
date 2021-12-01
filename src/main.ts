import { setFailed } from "@actions/core";
import { getInputs } from "./inputs";
import * as upload from "./upload";
import * as fs from "fs";
async function run(): Promise<void> {
  try {
    const inputs = await getInputs();
    if (inputs.ca !== undefined && inputs.ca.length > 0) {
      fs.writeFileSync("/tmp/ca.pem", inputs.ca);
      fs.writeFileSync("/tmp/cert.pem", inputs.cert);
      fs.writeFileSync("/tmp/key.pem", inputs.key);
    }

    await upload.run(inputs);
  } catch (error) {
    setFailed(error.message);
  }
}

run();
