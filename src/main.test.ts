import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {it} from '@jest/globals'

it.skip('should run the action', () => {
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})
