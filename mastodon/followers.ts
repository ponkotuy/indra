import { Account } from '../model/acccount.ts'
import { authHeader, host, paging } from './mastodon.ts'

const LIMIT = 80

export const getFollowers = async (token: string, id: string, page: number = 0): Promise<Account[]> => {
  const params = new URLSearchParams({ limit: `${LIMIT}` })
  const res = await fetch(`${host}/api/v1/accounts/${id}/followers?${params}`, authHeader(token))
  return ((await res.json()) as Account[]).concat(await paging(token, res, page - 1))
}
