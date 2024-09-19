import { postApp, Scope } from '../mastodon/app.ts'
import { getToken, printAuthorizeURL } from '../mastodon/auth.ts'
import { App } from '../model/app.ts'
import { Authentication } from '../model/authentication.ts'
import { loadApp, saveApp } from '../cache/app.ts'
import { loadHost, saveHost } from '../cache/host.ts'
import { loadOrElseToken } from '../cache/auth.ts'

const DEFAULT_SCOPES = [Scope.Push, Scope.Read, Scope.Write]

const resolveApp = async (): Promise<[App, string]> => {
  const rawHost = prompt('Please enter mastodon host:')
  if (rawHost === null) Deno.exit(1)
  const url = (URL.parse(rawHost) || URL.parse('https://' + rawHost))!
  console.log(url)
  const host = `${url.protocol}//${url.hostname}`
  return [await postApp(host, DEFAULT_SCOPES), host]
}

const resolveToken = async (host: string, app: App): Promise<string> => {
  printAuthorizeURL(host, app, DEFAULT_SCOPES)
  const code = prompt('Please enter code:')
  if (code === null) Deno.exit(1)
  const token = await getToken(host, app, code, DEFAULT_SCOPES)
  return token
}

export const resolveAuth = async (): Promise<Authentication> => {
  const maybeHost = loadHost()
  const maybeApp = loadApp()
  const [app, host] = (maybeHost && maybeApp) ? [maybeApp, maybeHost] : await resolveApp()
  if (!maybeHost) saveHost(host)
  if (!maybeApp) saveApp(app)
  const token = await loadOrElseToken(() => resolveToken(host, app))
  return { host, token, app }
}
