import { App } from '../model/app.ts'
import { REDIRECT_URI } from './mastodon.ts'

export const getToken = async (host: string, app: App, code: string) => {
  const formData = new FormData()
  formData.append('client_id', app.client_id)
  formData.append('client_secret', app.client_secret)
  formData.append('grant_type', 'authorization_code')
  formData.append('code', code)
  formData.append('redirect_uri', REDIRECT_URI)
  const res = await fetch(`${host}/oauth/token`, {
    method: 'POST',
    body: formData,
  })
  return (await res.json())['access_token']
}

export const printAuthorizeURL = (host: string, app: App) => {
  const parmas = new URLSearchParams({
    response_type: 'code',
    client_id: app.client_id,
    redirect_uri: REDIRECT_URI,
  })
  console.log(`Authorize URL: ${host}/oauth/authorize?${parmas}`)
}
