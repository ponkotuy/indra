import { Command } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'
import { IdOption, JsonOption } from './options.ts'
import { loadOrElseAuth } from '../cache/auth.ts'
import { resolveAuth } from '../auth.ts'
import { loadOrElseCredentialAccount } from '../cache/credential_account.ts'
import { getVerifyCredentials } from '../mastodon/verify_credentials.ts'
import { loadOrElseAccount } from '../cache/account.ts'
import { getAccount } from '../mastodon/account.ts'
import { stdout } from './command.ts'

const printAccount = new Command()
  .description('print account information')
  .option(...IdOption)
  .option(...JsonOption)
  .action(async ({ id, json }) => {
    const token = await loadOrElseAuth(resolveAuth)
    const requestId = id || (await loadOrElseCredentialAccount(() => getVerifyCredentials(token))).id
    const account = await loadOrElseAccount(requestId)(() => getAccount(token, requestId))
    stdout(account, json)
  })

export const account = new Command()
  .default('print')
  .command('print', printAccount)
