# actions-coverage-upload

Action for uploading coverage report to backstage

## usage

```yaml
on: [push]

jobs:
  coverage-upload:
    runs-on: [self-hosted,ts-large-x64-docker-large]
    steps:
      - uses: tradeshift/actions-coverage-upload@v1
        with:
          server: http://backstage:7000
          file: coverage.xml
          name: servicename
          type: [cobertura|jacoco]
          # optional values for using mutual tls:
          ca-cert: ${{ secrets.MTLS_CACERT }}
          client-cert: ${{ secrets.MTLS_CERT }}
          client-key: ${{ secrets.MTLS_KEY }}
```

## building the code

Uses NPM 8/Node 16 or newer
Test change (dont merge)
