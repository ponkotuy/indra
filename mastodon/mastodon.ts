import { HTTPHeaderLink } from 'https://github.com/hugoalh-studio/http-header-link-es/raw/v1.0.2/mod.ts'

export const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob'

export const clientId = Deno.env.get('CLIENT_ID')!
export const clientSecret = Deno.env.get('CLIENT_SECRET')!
export const host = Deno.env.get('MASTODON_HOST')!

export const authHeader = (token: string): RequestInit => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const paging = async <T>(token: string, beforeRes: Response, page: number = -1): Promise<T[]> => {
  if (page === 0) return []
  const link = beforeRes.headers.get('link')
  console.log(link)
  if (link == null) return []
  const nextRel = new HTTPHeaderLink(link).getByRel('next').at(0)
  if (!nextRel) return []
  const res = await fetch(nextRel[0], authHeader(token))
  return ((await res.json()) as T[]).concat(await paging(token, res, page - 1))
}