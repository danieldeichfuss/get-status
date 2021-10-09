# Create a JavaScript Action

<p align="center">
  <a href="https://github.com/actions/javascript-action/actions"><img alt="javscript-action status" src="https://github.com/actions/javascript-action/workflows/units-test/badge.svg"></a>
</p>

# Get Status Github action

Github action to get the status checks of a given ref

## Inputs

### `ref`

**Required** Git ref, e.g. the sha.

## Outputs

### `all-checks-completed`

Returns true if all checks are completed.

### `all-checks-passed`

Returns true if all checks concluded either with success or skipped.

## Example usage

```yml
uses: actions/get-status@0.0.1
with:
  ref: '1234'
```
