import { Command } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'
import { blocks } from './blocks.ts'
import { identity } from './identity.ts'
import { followers } from './followers.ts'
import { notifications } from './notifications.ts'
import { account } from './account.ts'
import { arrow } from './arrow.ts'

export const genCommand = async () =>
  await new Command()
    .name('indra')
    .version('0.1.0')
    .description('Script to destroy annoying mastodon neighbours by deno.')
    .command('blocks', blocks)
    .command('identity', identity)
    .command('followers', followers)
    .command('notifications', notifications)
    .alias('n')
    .command('account', account)
    .command('arrow', arrow)
    .parse(Deno.args)
