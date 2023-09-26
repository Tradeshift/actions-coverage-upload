# `actions-coverage-upload` GitHub Action

## Overview

`actions-coverage-upload` is an internal GitHub Action designed to upload code coverage reports to a Backstage server. This action is compatible with multiple types of code coverage reports, including Cobertura and Jacoco, and offers optional support for mutual TLS.

## Prerequisites

Ensure that you are using NodeJS 16.x or higher and npm 8.x or higher before running this action.

## Inputs

The action supports the following inputs:

- `server`: The URL of the Backstage server where the coverage report should be uploaded.
- `file`: The path to the coverage report file, usually in XML format.
- `name`: The name of the service for which the coverage report is uploaded.
- `type`: The type of code coverage report. Currently supported types are `cobertura` and `jacoco`.

### Optional Inputs

- `ca-cert`: CA certificate for mutual TLS.
- `client-cert`: Client certificate for mutual TLS.
- `client-key`: Client key for mutual TLS.

## Example Usage

Here is a sample GitHub Actions workflow demonstrating how to use `actions-coverage-upload`.

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

## Build and Development

To build the project you'll need NodeJS 16.x and npm 8.x or higher:

```bash
npm ci
npm run all
```
