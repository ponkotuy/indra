import { Command, EnumType } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'
import { getNotifications, NtfType } from '../mastodon/notifications.ts'
import { resolveAuth } from '../util/auth.ts'
import { JsonOption } from './options.ts'
import { stdout } from './command.ts'

const printNotifications = new Command()
  .description('print your notifications')
  .type('type', new EnumType(Object.values(NtfType)))
  .option('-t, --types <types:type[]>', 'set the notifications types', { default: ([] as NtfType[]) })
  .option(...JsonOption)
  .action(async ({ types, json }) => {
    const auth = await resolveAuth()
    const notifications = await getNotifications(auth, types)
    stdout(notifications.reverse(), json)
  })

export const notifications = new Command()
  .default('print')
  .command('print', printNotifications)
