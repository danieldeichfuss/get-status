import * as pluginRestEndpointMethods from '@octokit/plugin-rest-endpoint-methods'
import {context, getOctokit} from '@actions/github'

export async function fetchChecks({
  ref,
  token
}: {
  ref: string
  token: string
}): Promise<
  | pluginRestEndpointMethods.RestEndpointMethodTypes['checks']['listSuitesForRef']['response']['data']
  | undefined
> {
  let checksResponse

  try {
    const octokit = getOctokit(token)
    checksResponse = await octokit.rest.checks.listSuitesForRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref
    })

    const combinedStatus = await octokit.rest.repos.getCombinedStatusForRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref
    })

    const commitStatuses = await octokit.rest.repos.listCommitStatusesForRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref
    })

    const checkRuns = await octokit.rest.checks.listForRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref
    })

    const checkSuites = await octokit.rest.checks.listSuitesForRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref
    })

    console.log({
      combinedStatus,
      commitStatuses,
      checkRuns,
      checkSuites
    })
  } catch (error) {
    console.error(error)
  }

  return checksResponse?.data
}
