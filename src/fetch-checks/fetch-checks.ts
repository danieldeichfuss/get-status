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
  } catch (error) {
    console.error(error)
  }

  return checksResponse?.data
}
