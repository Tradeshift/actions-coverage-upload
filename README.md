# actions-coverage-upload

Action for uploading coverage report to backstage

## usage

```yaml
on: [push]

jobs:
  coverage-upload:
    runs-on: self-hosted
    steps:
      - uses: tradeshift/actions-coverage-upload@v1
        with:
          server: http://backstage:7000
          file: coverage.xml
          name: servicename
```
