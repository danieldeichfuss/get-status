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
  let checks

  console.log({ref, token, owner: context.repo.owner, repo: context.repo.repo})

  try {
    const octokit = getOctokit(token)
    const checksResponse = await octokit.rest.checks.listSuitesForRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref
    })
    checks = checksResponse.data
  } catch (error) {
    console.log({error})
  }

  return checks
}
