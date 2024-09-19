import { Authentication } from '../model/authentication.ts'
import { Block } from '../model/block.ts'
import { authHeader, paging } from './mastodon.ts'

const LIMIT = 80

export const getBlocks = async (auth: Authentication, page: number = 0): Promise<Block[]> => {
  const params = new URLSearchParams({ limit: `${LIMIT}` })
  const res = await fetch(`${auth.host}/api/v1/blocks?${params}`, authHeader(auth.token))
  return ((await res.json()) as Block[]).concat(await paging(auth.token, res, page - 1))
}

export const postBlock = async (auth: Authentication, id: string): Promise<number> => {
  const res = await fetch(`${auth.host}/api/v1/accounts/${id}/block`, { method: 'POST', ...authHeader(auth.token) })
  console.log(await res.text())
  Deno.exit(1)
  return res.status
}
