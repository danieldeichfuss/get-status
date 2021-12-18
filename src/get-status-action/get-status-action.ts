import * as core from '@actions/core'
import {getStatus} from '../get-status'

export async function getStatusAction(): Promise<void> {
  try {
    const ref = core.getInput('ref')
    const token = core.getInput('token')
    const ignore = core.getInput('ignore').split(',')

    core.info(`Running action for ref ${ref}`)

    const statusChecks = await getStatus({
      ref,
      token,
      ignore
    })

    core.info(`all-checks-completed: ${statusChecks.allChecksCompleted}`)
    core.info(`all-checks-passed: ${statusChecks.allChecksPassed}`)

    core.setOutput('all-checks-completed', statusChecks.allChecksCompleted)
    core.setOutput('all-checks-passed', statusChecks.allChecksPassed)
  } catch (error) {
    core.setFailed((error as Error).message)
  }
}
