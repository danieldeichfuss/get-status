import * as pluginRestEndpointMethods from '@octokit/plugin-rest-endpoint-methods'
import {context, getOctokit} from '@actions/github'

export async function fetchChecks({
  ref,
  token
}: {
  ref: string
  token: string
}): Promise<
  | pluginRestEndpointMethods.RestEndpointMethodTypes['checks']['listSuitesForRef']['response']
  | undefined
> {
  let checks

  console.log({ref, token, owner: context.repo.owner, repo: context.repo.repo})

  try {
    const octokit = getOctokit(token)
    checks = await octokit.rest.checks.listSuitesForRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref
    })
  } catch (error) {
    console.log({error})
  }

  return checks
}
