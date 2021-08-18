import { setFailed } from "@actions/core";
import { getInputs } from "./inputs";
import * as upload from "./upload";

async function run(): Promise<void> {
  try {
    const inputs = await getInputs();
    await upload.run(inputs);
  } catch (error) {
    setFailed(error.message);
  }
}

run();
