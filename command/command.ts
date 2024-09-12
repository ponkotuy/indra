import { Command } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'
import { blocks } from './blocks.ts'
import { identity } from './identity.ts'

export const genCommand = async () =>
  await new Command()
    .name('indra')
    .version('0.1.0')
    .description('Script to destroy annoying mastodon neighbours by deno.')
    .command('blocks', blocks)
    .command('identity', identity)
    .parse(Deno.args)
