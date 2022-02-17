import { Inputs } from './inputs';
import { getExecOutput } from '@actions/exec';

export async function run(inputs: Inputs): Promise<void> {
  const params = [
    '-X',
    'POST',
    '-H',
    `Content-Type:text/xml`,
    '-d',
    `@${inputs.file}`,
    `${inputs.server}/api/code-coverage/report?entity=component:default/${inputs.name}&coverageType=${inputs.type}`,
    '--write-out',
    'HTTP:%{http_code}',
  ];
  if (inputs.ca) {
    params.push('--cacert');
    params.push('/tmp/ca.pem');
  }
  if (inputs.cert) {
    params.push('--cert');
    params.push(`/tmp/cert.pem`);
  }
  if (inputs.key) {
    params.push('--key');
    params.push(`/tmp/key.pem`);
  }
  const res = await getExecOutput('curl', params, { silent: false });

  if (!/HTTP:201$/.exec(res.stdout)) {
    throw new Error(`Error uploading coverage`);
  }
  if (res.stderr !== '' && res.exitCode !== 0) {
    throw new Error(`Error uploading coverage: ${res.stderr}`);
  }
}
