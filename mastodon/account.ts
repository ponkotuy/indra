import { Account } from '../model/acccount.ts'
import { authHeader, host } from './mastodon.ts'

export const getAccount = async (token: string, id: string): Promise<Account> => {
  const res = await fetch(`${host}/api/v1/accounts/${id}`, authHeader(token))
  return await res.json()
}
