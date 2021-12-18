import * as core from '@actions/core'
import {ActionInput, ActionOutput} from '../types'
import {fetchChecks} from '../fetch-checks'

export async function getStatus({
  ref,
  token
}: ActionInput): Promise<ActionOutput> {
  const checks = await fetchChecks({ref, token})
  const checkRuns = checks?.check_runs

  core.info(`Your ref has ${checkRuns?.length ?? 0} check runs.`)

  const previousCheckRuns = checkRuns?.filter(
    checkRun => checkRun.name !== 'get-status'
  )

  const hasNoOtherCheckRuns =
    !previousCheckRuns || previousCheckRuns.length === 0

  if (hasNoOtherCheckRuns) {
    return {
      allChecksCompleted: true,
      allChecksPassed: true
    }
  }

  const allChecksCompleted = previousCheckRuns?.every(checkRun => {
    return checkRun.status === 'completed'
  })

  const allChecksPassed = previousCheckRuns?.every(checkRun => {
    return (
      checkRun.conclusion === 'success' ||
      checkRun.conclusion === 'neutral' ||
      checkRun.conclusion === 'skipped'
    )
  })

  core.info(`All checks completed: ${allChecksCompleted}.`)
  core.info(`All checks passed: ${allChecksPassed}.`)

  return {
    allChecksCompleted: allChecksCompleted || false,
    allChecksPassed: allChecksPassed || false
  }
}
