/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto'
import { gitHubCredentials } from './GitHubClient'


// Validate git hook by creating hmac sha1 with hook secret and payload
// https://developer.github.com/webhooks/securing/
export function isValidHook(payload: any, webHookSecret: string): boolean {
  const hmac = crypto.createHmac('sha1', gitHubCredentials.webHookSecret)
  hmac.update(JSON.stringify(payload))
  const hmacDigest = hmac.digest('hex')
  console.log(`curr header: ${gitHubCredentials.webHookSecret}`)
  console.log(`curr header digest: ${hmacDigest}`)
  console.log(`in header: ${webHookSecret}`)
  return `sha1=${hmacDigest}` === webHookSecret
}