import { getBlocks, getToken, printAuthorize } from './mastodon.ts'

printAuthorize()
const code = prompt('Please enter code:')
if (code === null) Deno.exit(1)
const token = await getToken(code)
console.log(await getBlocks(token))
