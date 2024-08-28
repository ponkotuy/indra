const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob'

const clientId = Deno.env.get('CLIENT_ID')!
const clientSecret = Deno.env.get('CLIENT_SECRET')!
const host = Deno.env.get('MASTODON_HOST')!

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

export const printAuthorize = () => {
  const parmas = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: REDIRECT_URI,
  })
  console.log(`Authorize URL: ${host}/oauth/authorize?${parmas}`)
}

export const getBlocks = async (token: string) => {
  const res = await fetch(`${host}/api/v1/blocks`, authHeader(token))
  return await res.json()
}

const authHeader = (token: string): RequestInit => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}
