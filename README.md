# Create a JavaScript Action

<p align="center">
  <a href="https://github.com/actions/javascript-action/actions"><img alt="javscript-action status" src="https://github.com/actions/javascript-action/workflows/units-test/badge.svg"></a>
</p>

# Get Status Github action

Github action to get the status checks of a given ref.

## Motivation

Not all workflows are supposed to run right after each other. Often we want different triggers, for the workflows. But it is still sometimes relevant to know if all the checks have passed successfully, before executing the next step.

The following workflow is quite common. In this scenario the last step, to release to production, will be done manually and requires all the other workflows to be finished successfully. With this GitHub Action, we can check if that's the case and use the out put to decide if it's safe to deploy the changes to production.

PR -> (Code Review + QA + Unit tests) -> Merge -> (Unit tests, E2E tests, Build) -> Release -> (Deploy to Production)

## Inputs

### `ref` (required)

Git ref, e.g. the sha.

Default:

### `token` (optional)

The GitHub token used to create an authenticated client.

Default: `github.token`.

### `ignore` (optional)

Workflow names that will be ignored during the validation. For multiple values, please separate them with commas, e.g. "test,build,get-status".

Default: []

## Outputs

### `all-checks-completed`

Returns true if all checks are completed.

### `all-checks-passed`

Returns true if all checks concluded either with success or skipped.

## Example usage

```yml
uses: actions/get-status@0.0.1
with:
  ref: ${{ github.sha }}
  ignore: 'test,build'
```

## Example workflow

```yml
name: Get Status Sample Workflow

on:
  release:
    types: [released]
jobs:
  get-status:
    runs-on: ubuntu-latest
    steps:
      - name: Get Status of current ref
        id: get-status
        uses: danieldeichfuss/get-status@v0
        with:
          ref: ${{ github.sha }}
      - name: Deploy to Production
        if: ${{steps.get-status.outputs.all-checks-completed == 'true' &&  steps.get-status.outputs.all-checks-passed == 'true'}}
        run: echo "Deploying to production"
```
