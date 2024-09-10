import { loadOrElseAuth } from './cache/auth.ts'
import { loadOrElseBlocks } from './cache/blocks.ts'
import { getToken, printAuthorizeURL } from './mastodon/auth.ts'
import { getBlocks } from './mastodon/blocks.ts'

const resolveAuth = async (): Promise<string> => {
  printAuthorizeURL()
  const code = prompt('Please enter code:')
  if (code === null) Deno.exit(1)
  const token = await getToken(code)
  return token
}

const token = await loadOrElseAuth(resolveAuth)
const blocks = await loadOrElseBlocks(() => getBlocks(token))
console.log(blocks.length)
console.log(blocks.map((x) => x.id))
