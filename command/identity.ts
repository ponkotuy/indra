import { Command } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'
import { resolveAuth } from '../util/auth.ts'
import { loadOrElseCredentialAccount } from '../cache/credential_account.ts'
import { getVerifyCredentials } from '../mastodon/verify_credentials.ts'
import { JsonOption } from './options.ts'
import { cGroupDesc, stdout } from './util.ts'

const printIdentity = new Command()
  .description('print your account information')
  .option(...JsonOption)
  .action(async ({ json }) => {
    const auth = await resolveAuth()
    const identity = await loadOrElseCredentialAccount(() => getVerifyCredentials(auth))
    stdout(identity, json)
  })

export const identity = new Command()
  .description(cGroupDesc('identity'))
  .default('print')
  .command('print', printIdentity)
