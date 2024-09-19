import { Account } from '../model/acccount.ts'
import { Authentication } from '../model/authentication.ts'
import { authHeader, paging } from './mastodon.ts'

const LIMIT = 80

export const getFollowers = async (auth: Authentication, id: string, page: number = 0): Promise<Account[]> => {
  const params = new URLSearchParams({ limit: `${LIMIT}` })
  const res = await fetch(`${auth.host}/api/v1/accounts/${id}/followers?${params}`, authHeader(auth.token))
  return ((await res.json()) as Account[]).concat(await paging(auth.token, res, page - 1))
}
