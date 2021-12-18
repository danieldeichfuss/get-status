import * as pluginRestEndpointMethods from '@octokit/plugin-rest-endpoint-methods'
import {context, getOctokit} from '@actions/github'

export async function fetchChecks({
  ref,
  token
}: {
  ref: string
  token: string
}): Promise<
  | pluginRestEndpointMethods.RestEndpointMethodTypes['checks']['listForRef']['response']['data']
  | undefined
> {
  let checkRuns

  try {
    const octokit = getOctokit(token)

    checkRuns = await octokit.rest.checks.listForRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref
    })
  } catch (error) {
    console.error(error)
  }

  return checkRuns?.data
}
