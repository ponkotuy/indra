import { loadOrElseAuth } from './cache.ts'
import { getBlocks, getToken, printAuthorizeURL } from './mastodon.ts'

const resolveAuth = async (): Promise<string> => {
  printAuthorizeURL()
  const code = prompt('Please enter code:')
  if (code === null) Deno.exit(1)
  const token = await getToken(code)
  return token
}

const token = await loadOrElseAuth(resolveAuth)
console.log(await getBlocks(token))
