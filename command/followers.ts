import { Command } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'
import { resolveAuth } from '../util/auth.ts'
import { loadOrElseCredentialAccount } from '../cache/credential_account.ts'
import { getVerifyCredentials } from '../mastodon/verify_credentials.ts'
import { loadOrElseFollowers } from '../cache/followers.ts'
import { getFollowers } from '../mastodon/followers.ts'
import { FilterOption, IdOption, JsonOption } from './options.ts'
import { filterJson } from '../util/filter_json.ts'
import { cGroupDesc, stdout } from './util.ts'

const printFollowers = new Command()
  .description('print any followers')
  .option('-a, --all', 'print all followers(use paging)')
  .option(...IdOption)
  .option(...FilterOption)
  .option(...JsonOption)
  .action(async ({ all, id, filter, json }) => {
    const auth = await resolveAuth()
    const requestId = id || (await loadOrElseCredentialAccount(() => getVerifyCredentials(auth))).id
    const followers = all
      ? await loadOrElseFollowers(requestId)(() => getFollowers(auth, requestId, 0))
      : await getFollowers(auth, requestId, 1)
    const regex = new RegExp(filter)
    const filtered = filterJson(followers, regex)
    const count = filtered.length == followers.length ? `${filtered.length}` : `${filtered.length}/${followers.length}`
    stdout(filtered, json, count)
  })

export const followers = new Command()
  .description(cGroupDesc('followers'))
  .default('print')
  .command('print', printFollowers)
