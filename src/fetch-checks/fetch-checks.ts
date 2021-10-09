import {context, getOctokit} from '@actions/github'
// import {PushEvent} from '@octokit/webhooks-definitions/schema'

export async function fetchChecks({ref, token}: {ref: string; token: string}) {
  const octokit = getOctokit(token)
  const checks = await octokit.rest.checks.listSuitesForRef({
    owner: context.repo.owner,
    repo: context.repo.repo,
    ref
  })
  console.log(checks)
  return checks
}
