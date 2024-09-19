import { App } from '../model/app.ts'
import { APP_NAME, APP_URL, REDIRECT_URI } from './mastodon.ts'

export const postApp = async (host: string, scopes: Scope[]): Promise<App> => {
  const formData = new URLSearchParams()
  formData.append('client_name', APP_NAME)
  formData.append('redirect_uris', REDIRECT_URI)
  formData.append('scopes', scopes.join(' '))
  formData.append('website', APP_URL)
  console.log(formData)
  const res = await fetch(`${host}/api/v1/apps`, { method: 'POST', body: formData })
  return res.json()
}

export const Scope = {
  Read: 'read',
  Write: 'write',
  Push: 'push',
} as const

export type Scope = (typeof Scope)[keyof typeof Scope]
