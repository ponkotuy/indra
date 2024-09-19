import { App } from '../model/app.ts'
import { APP_URL, REDIRECT_URI } from './mastodon.ts'

export const postApp = async (host: string, scopes: Scope[]): Promise<App> => {
  const formData = new FormData()
  formData.append('client_name', name)
  formData.append('redirect_uris', REDIRECT_URI)
  formData.append('scopes', scopes.join(' '))
  formData.append('website', APP_URL)
  const res = await fetch(`${host}/api/v1/apps`)
  return res.json()
}

export const Scope = {
  Read: 'read',
  Write: 'write',
  Push: 'push',
} as const

export type Scope = (typeof Scope)[keyof typeof Scope]
