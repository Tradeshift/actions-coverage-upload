import { CoverageType, getInputs } from '../src/inputs';
import { run } from '../src/upload';
import * as exec from '@actions/exec';

describe('actions-coverage-upload', () => {
  describe('inputs', () => {
    it('gets inputs', () => {
      const a = getInputs();
      // expect(a).toEqual('foo');
    });
  });
  describe('upload', () => {
    it('passes upload args to curl', async () => {
      const spy = jest
        .spyOn(exec, 'getExecOutput')
        .mockResolvedValue({ stderr: '', stdout: 'HTTP:201', exitCode: 0 });
      // yes
      await run({
        file: 'some-report.xml',
        name: 'my-service',
        server: 'https://my-server.com',
        type: CoverageType.cobertura,
      });

      // Should pass the values somehow:
      expect(spy).toHaveBeenCalledWith(
        'curl',
        expect.arrayContaining([
          expect.stringContaining('@some-report.xml'),
          expect.stringContaining('https://my-server.com'),
          expect.stringContaining('my-service'),
          expect.stringContaining(CoverageType.cobertura),
        ]),
        expect.anything()
      );
    });
    it('passes ca/cert/key to curl', async () => {
      const spy = jest
        .spyOn(exec, 'getExecOutput')
        .mockResolvedValue({ stderr: '', stdout: 'HTTP:201', exitCode: 0 });
      // yes
      await run({
        file: 'a',
        name: 'my-service',
        server: 'https://my-server.com',
        type: CoverageType.cobertura,
        //
        ca: 'some-value',
        key: 'some-value',
        cert: 'some-value',
      });

      // Should pass the values somehow:
      expect(spy).toHaveBeenCalledWith(
        'curl',
        expect.arrayContaining([
          '--cacert',
          '/tmp/ca.pem',
          '--key',
          '/tmp/key.pem',
          '--cert',
          '/tmp/cert.pem',
        ]),
        expect.anything()
      );
    });
  });
});
