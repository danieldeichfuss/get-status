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
      checkRuns: checkRuns.data.check_runs,
      checkSuites: checkSuites.data.check_suites
    })
  } catch (error) {
    console.error(error)
  }

  return checksResponse?.data
}
