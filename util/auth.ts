import { postApp, Scope } from '../mastodon/app.ts'
import { getToken, printAuthorizeURL } from '../mastodon/auth.ts'
import { urlParse } from 'https://deno.land/x/url_parse/mod.ts'
import { App } from '../model/app.ts'
import { Authentication } from '../model/authentication.ts'
import { loadApp } from '../cache/app.ts'
import { loadHost } from '../cache/host.ts'
import { loadOrElseToken } from '../cache/auth.ts'

export const resolveApp = async (): Promise<[App, string]> => {
  const rawHost = prompt('Please enter mastodon host:')
  const url = urlParse(rawHost)
  url.protocol = 'https'
  const host = `${url.protocol || 'https:'}//${url.hostname}`
  return [await postApp(host, [Scope.Push, Scope.Read, Scope.Write]), host]
}

export const resolveToken = async (host: string, app: App): Promise<string> => {
  printAuthorizeURL(host, app)
  const code = prompt('Please enter code:')
  if (code === null) Deno.exit(1)
  const token = await getToken(host, app, code)
  return token
}

export const resolveAuth = async (): Promise<Authentication> => {
  const maybeHost = loadHost()
  const maybeApp = loadApp()
  const [app, host] = maybeHost && maybeApp ? [maybeApp, maybeHost] : await resolveApp()
  const token = await loadOrElseToken(() => resolveToken(host, app))
  return { host, token, app }
}
