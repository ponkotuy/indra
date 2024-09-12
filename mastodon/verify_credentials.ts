import { CredentialAccount } from '../model/credential_account.ts'
import { authHeader, host } from './mastodon.ts'

export const getVerifyCredentials = async (token: string): Promise<CredentialAccount> => {
  const res = await fetch(`${host}/api/v1/accounts/verify_credentials`, authHeader(token))
  return (await res.json()) as CredentialAccount
}
