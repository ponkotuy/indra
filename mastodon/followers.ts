import { Follower } from '../model/follower.ts'
import { authHeader, host, paging } from './mastodon.ts'

const LIMIT = 80

export const getFollowers = async (token: string, id: string, page: number = 0): Promise<Follower[]> => {
  const params = new URLSearchParams({ limit: `${LIMIT}` })
  const res = await fetch(`${host}/api/v1/accounts/${id}/followers?${params}`, authHeader(token))
  return ((await res.json()) as Follower[]).concat(await paging(token, res, page - 1))
}
