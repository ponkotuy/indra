import { Command } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'
import { loadOrElseAuth } from '../cache/auth.ts'
import { resolveAuth } from '../auth.ts'
import { loadOrElseCredentialAccount } from '../cache/credential_account.ts'
import { getVerifyCredentials } from '../mastodon/verify_credentials.ts'
import { loadOrElseFollowers } from '../cache/followers.ts'
import { getFollowers } from '../mastodon/followers.ts'

const printFollowers = new Command()
  .description('print your followers')
  .option('-a, --all', 'print all followers(use paging)')
  .option('--id <id:string>', 'set account id. default: credential id')
  .action(async ({ all, id }) => {
    const token = await loadOrElseAuth(resolveAuth)
    const requestId = id || (await loadOrElseCredentialAccount(() => getVerifyCredentials(token))).id
    const followers = all
      ? await loadOrElseFollowers(requestId)(() => getFollowers(token, requestId, 0))
      : await getFollowers(token, requestId, 1)
    console.log(followers)
    console.log(`follower count: ${followers.length}`)
  })

export const followers = new Command()
  .default('print')
  .command('print', printFollowers)
