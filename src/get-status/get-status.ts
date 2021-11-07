import * as core from '@actions/core'
import {ActionInput, ActionOutput} from '../types'
import {fetchChecks} from '../fetch-checks'

export async function getStatus({
  ref,
  token
}: ActionInput): Promise<ActionOutput> {
  const checks = await fetchChecks({ref, token})
  const checkRuns = checks?.check_runs

  core.info(`Check Suites: ${JSON.stringify(checks)}`)

  const allChecksCompleted = checkRuns?.every(checkRun => {
    return checkRun.status === 'completed'
  })

  const allChecksPassed = checkRuns?.every(checkRun => {
    return (
      checkRun.conclusion === 'success' ||
      checkRun.conclusion === 'neutral' ||
      checkRun.conclusion === 'skipped'
    )
  })

  return {
    allChecksCompleted: allChecksCompleted || false,
    allChecksPassed: allChecksPassed || false
  }
}
