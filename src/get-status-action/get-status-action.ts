import * as core from '@actions/core'
import {getStatus} from '../get-status'

export function getStatusAction(): void {
  try {
    const ref = core.getInput('ref')
    const token = core.getInput('token')

    const statusChecks = getStatus({
      ref,
      token
    })

    core.setOutput('all-checks-completed', statusChecks.allChecksCompleted)
    core.setOutput('all-checks-passed', statusChecks.allChecksPassed)
  } catch (error) {
    core.setFailed((error as Error).message)
  }
}
