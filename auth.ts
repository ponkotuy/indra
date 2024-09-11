import { getToken, printAuthorizeURL } from './mastodon/auth.ts'

export const resolveAuth = async (): Promise<string> => {
  printAuthorizeURL()
  const code = prompt('Please enter code:')
  if (code === null) Deno.exit(1)
  const token = await getToken(code)
  return token
}
