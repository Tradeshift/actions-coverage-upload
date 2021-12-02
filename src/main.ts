import { setFailed } from "@actions/core";
import { getInputs } from "./inputs";
import * as upload from "./upload";
import * as fs from "fs";

function processCert(cert: string) {
  const isBase64Exp =
    /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
  if (isBase64Exp.exec(cert)) {
    return Buffer.from(cert, "base64").toString("utf-8");
  }
  return cert;
}

async function run(): Promise<void> {
  try {
    const inputs = await getInputs();
    if (inputs.ca !== undefined && inputs.ca.length > 0) {
      fs.writeFileSync("/tmp/ca.pem", processCert(inputs.ca));
      fs.writeFileSync("/tmp/cert.pem", processCert(inputs.cert));
      fs.writeFileSync("/tmp/key.pem", processCert(inputs.key));
    }

    await upload.run(inputs);
  } catch (error) {
    setFailed(error.message);
  }
}

run();
