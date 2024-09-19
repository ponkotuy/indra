import { Authentication } from '../model/authentication.ts'
import { CredentialAccount } from '../model/credential_account.ts'
import { authHeader } from './mastodon.ts'

export const getVerifyCredentials = async (auth: Authentication): Promise<CredentialAccount> => {
  const res = await fetch(`${auth.host}/api/v1/accounts/verify_credentials`, authHeader(auth.token))
  return (await res.json()) as CredentialAccount
}
