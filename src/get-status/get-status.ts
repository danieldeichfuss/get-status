import * as core from '@actions/core'
import {ActionInput, ActionOutput} from '../types'
import {context} from '@actions/github'
import {fetchChecks} from '../fetch-checks'

export async function getStatus({
  ref,
  token
}: ActionInput): Promise<ActionOutput> {
  const checks = await fetchChecks({ref, token})
  const checkRuns = checks?.check_runs

  core.info(`Check Suites: ${JSON.stringify(checks)}`)
  core.info(`Context: ${JSON.stringify(context)}`)

  const previousCheckRuns = checkRuns?.filter(
    checkRun => checkRun.name !== 'get-status'
  )

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

  return {
    allChecksCompleted: allChecksCompleted || false,
    allChecksPassed: allChecksPassed || false
  }
}
