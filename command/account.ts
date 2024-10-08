import { Command } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'
import { IdOption, JsonOption } from './options.ts'
import { resolveAuth } from '../util/auth.ts'
import { loadOrElseCredentialAccount } from '../cache/credential_account.ts'
import { getVerifyCredentials } from '../mastodon/verify_credentials.ts'
import { loadOrElseAccount } from '../cache/account.ts'
import { getAccount } from '../mastodon/account.ts'
import { cGroupDesc, stdout } from './util.ts'

const printAccount = new Command()
  .description('print account information')
  .option(...IdOption)
  .option(...JsonOption)
  .action(async ({ id, json }) => {
    const auth = await resolveAuth()
    const requestId = id || (await loadOrElseCredentialAccount(() => getVerifyCredentials(auth))).id
    const account = await loadOrElseAccount(requestId)(() => getAccount(auth, requestId))
    stdout(account, json)
  })

export const account = new Command()
  .description(cGroupDesc('account'))
  .default('print')
  .command('print', printAccount)
