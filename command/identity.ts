import { Command } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'
import { loadOrElseAuth } from '../cache/auth.ts'
import { resolveAuth } from '../auth.ts'
import { loadOrElseCredentialAccount } from '../cache/credential_account.ts'
import { getVerifyCredentials } from '../mastodon/verify_credentials.ts'
import { JsonOption } from './options.ts'
import { stdout } from './command.ts'

const printIdentity = new Command()
  .description('print your account information')
  .option(...JsonOption)
  .action(async ({ json }) => {
    const token = await loadOrElseAuth(resolveAuth)
    const identity = await loadOrElseCredentialAccount(() => getVerifyCredentials(token))
    stdout(identity, json)
  })

export const identity = new Command()
  .default('print')
  .command('print', printIdentity)
