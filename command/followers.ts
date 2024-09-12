import { Command } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'
import { loadOrElseAuth } from '../cache/auth.ts'
import { resolveAuth } from '../auth.ts'
import { loadOrElseCredentialAccount } from '../cache/credential_account.ts'
import { getVerifyCredentials } from '../mastodon/verify_credentials.ts'
import { loadOrElseFollowers } from '../cache/followers.ts'
import { getFollowers } from '../mastodon/followers.ts'
import { FilterOption } from './options.ts'

const printFollowers = new Command()
  .description('print any followers')
  .option('-a, --all', 'print all followers(use paging)')
  .option('--id <id:string>', 'set account id. default: credential id')
  .option(...FilterOption)
  .action(async ({ all, id, filter }) => {
    const token = await loadOrElseAuth(resolveAuth)
    const requestId = id || (await loadOrElseCredentialAccount(() => getVerifyCredentials(token))).id
    const followers = all
      ? await loadOrElseFollowers(requestId)(() => getFollowers(token, requestId, 0))
      : await getFollowers(token, requestId, 1)
    const regex = new RegExp(filter)
    const filtered = followers.filter((x) => regex.test(JSON.stringify(x)))
    console.log(filtered)
    if (filtered.length != followers.length) console.log(`follower count: ${filtered.length}/${followers.length}`)
    else console.log(`follower count: ${filtered.length}`)
  })

export const followers = new Command()
  .default('print')
  .command('print', printFollowers)
