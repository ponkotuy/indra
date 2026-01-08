import { Authentication } from '../model/authentication.ts'
import { authHeader, paging } from './mastodon.ts'

const LIMIT = 80

export const getDomainBlocks = async (auth: Authentication, page: number = 0): Promise<string[]> => {
  const params = new URLSearchParams({ limit: `${LIMIT}` })
  const res = await fetch(`${auth.host}/api/v1/domain_blocks?${params}`, authHeader(auth.token))
  return ((await res.json()) as string[]).concat(await paging(auth.token, res, page - 1))
}

export const postDomainBlock = async (auth: Authentication, domain: string): Promise<number> => {
  const params = new URLSearchParams({ domain })
  const res = await fetch(`${auth.host}/api/v1/domain_blocks`, {
    method: 'POST',
    ...authHeader(auth.token),
    body: params,
  })
  return res.status
}

export const deleteDomainBlock = async (auth: Authentication, domain: string): Promise<number> => {
  const params = new URLSearchParams({ domain })
  const res = await fetch(`${auth.host}/api/v1/domain_blocks?${params}`, {
    method: 'DELETE',
    ...authHeader(auth.token),
  })
  return res.status
}
