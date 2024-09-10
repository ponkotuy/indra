import { Block } from '../model/block.ts'
import { authHeader, host, paging } from './mastodon.ts'

const LIMIT = 80

export const getBlocks = async (token: string, page: number = 0): Promise<Block[]> => {
  const params = new URLSearchParams({ limit: `${LIMIT}` })
  const res = await fetch(`${host}/api/v1/blocks?${params}`, authHeader(token))
  return ((await res.json()) as Block[]).concat(await paging(token, res, page - 1))
}
