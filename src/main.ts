import * as core from '@actions/core'
import * as github from '@actions/github'
import {getStatus} from './get-status'

async function run(): Promise<void> {
  try {
    const ref = core.getInput('ref')
    const token = core.getInput('token')

    const statusChecks = getStatus({ref, token})

    core.setOutput('all-checks-completed', statusChecks.allChecksCompleted)
    core.setOutput('all-checks-passed', statusChecks.allChecksPassed)

    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`)
  } catch (error) {
    core.setFailed((error as Error).message)
  }
}

run()
