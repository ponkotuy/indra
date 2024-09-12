import { assert } from 'https://deno.land/std@0.134.0/testing/asserts.ts'
import { authHeader, host } from './mastodon.ts'

const LIMIT = 80

export const getNotifications = async (token: string, types: NtfType[], limit: number = LIMIT) => {
  assert(limit <= 80, 'limit must not exceed 80')
  const params = new URLSearchParams({ limit: `${limit}` })
  types.forEach((t) => params.append('types[]', t))
  const res = await fetch(`${host}/api/v1/notifications?${params}`, authHeader(token))
  console.log(res)
  return await res.json()
}

export const NtfType = {
  Mention: 'mention',
  Status: 'status',
  Reblog: 'reblog',
  Follow: 'follow',
  FollowRequest: 'follow_request',
  Favorite: 'favorite',
  Poll: 'poll',
  Update: 'update',
} as const

export type NtfType = (typeof NtfType)[keyof typeof NtfType]
