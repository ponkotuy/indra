import { clientId, clientSecret, host, REDIRECT_URI } from './mastodon.ts'

export const getToken = async (code: string) => {
  const formData = new FormData()
  formData.append('client_id', clientId)
  formData.append('client_secret', clientSecret)
  formData.append('grant_type', 'authorization_code')
  formData.append('code', code)
  formData.append('redirect_uri', REDIRECT_URI)
  const res = await fetch(`${host}/oauth/token`, {
    method: 'POST',
    body: formData,
  })
  return (await res.json())['access_token']
}

export const printAuthorizeURL = () => {
  const parmas = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: REDIRECT_URI,
  })
  console.log(`Authorize URL: ${host}/oauth/authorize?${parmas}`)
}
