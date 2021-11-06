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
  const octokit = getOctokit(token)
  const checksResponse = await octokit.rest.checks.listSuitesForRef({
    owner: context.repo.owner,
    repo: context.repo.repo,
    ref
  })

  console.log(checksResponse.data)

  return checksResponse.data
}
