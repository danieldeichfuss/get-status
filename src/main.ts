import * as core from '@actions/core'
import * as github from '@actions/github'
import {fetchChecks} from './fetch-checks'

async function run(): Promise<void> {
  try {
    const ref = core.getInput('ref')
    const token = core.getInput('token')
    console.log(`Ref input: ${ref}`)
    console.log(`Token input: ${token}`)

    console.log('fetchChecks', await fetchChecks({token, ref}))

    core.setOutput('all-checks-completed', true)
    core.setOutput('all-checks-passed', false)

    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`)
  } catch (error) {
    core.setFailed((error as Error).message)
  }
}

run()
