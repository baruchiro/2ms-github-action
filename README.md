# 2ms Action

push

This Github Action downloads and runs the Checkmarx/2ms tool on a cloned repository, and publishes the output as SARIF.

## Inputs

`repo-path`

The path of the cloned repository. Default: `'.'`.

## Example usage

```yml
name: My Workflow

on: [push]

jobs:
  checkmarx:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Run Checkmarx/2ms
      uses: checkmarx/2ms-action@v1.0.0
      with:
        repo-path: '.'
```
