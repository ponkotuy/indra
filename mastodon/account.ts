import { Account } from '../model/acccount.ts'
import { Authentication } from '../model/authentication.ts'
import { authHeader } from './mastodon.ts'

export const getAccount = async (auth: Authentication, id: string): Promise<Account> => {
  const res = await fetch(`${auth.host}/api/v1/accounts/${id}`, authHeader(auth.token))
  return await res.json()
}
