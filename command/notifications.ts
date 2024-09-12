import { Command, EnumType } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'
import { getNotifications, NtfType } from '../mastodon/notifications.ts'
import { loadOrElseAuth } from '../cache/auth.ts'
import { resolveAuth } from '../auth.ts'

const printNotifications = new Command()
  .description('print your notifications')
  .type('type', new EnumType(Object.values(NtfType)))
  .option('-t, --types <types:type[]>', 'set the notifications types', { default: ([] as NtfType[]) })
  .action(async ({ types }) => {
    const token = await loadOrElseAuth(resolveAuth)
    const notifications = await getNotifications(token, types)
    console.log(notifications.reverse())
  })

export const notifications = new Command()
  .default('print')
  .command('print', printNotifications)
