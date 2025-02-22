import { Command } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'
import { resolveAuth } from '../util/auth.ts'
import { getNotifications, NtfType } from '../mastodon/notifications.ts'
import { filterJson } from '../util/filter_json.ts'
import { JsonOption } from './options.ts'
import { Account } from '../model/acccount.ts'
import { postBlock } from '../mastodon/blocks.ts'
import { Authentication } from '../model/authentication.ts'
import { cGroupDesc, stdout } from './util.ts'

const DEFAULT_FILTER = new RegExp('神[罪|帝|蒼]')
const BAN_USERNAMES = ['Twitter', 'YouTube', 'Instagram', 'Gmail']
const WHITE_LIST = 'U'

const usernameFilter = (username: string): boolean =>
  (username.length === 1 && !WHITE_LIST.includes(username)) || BAN_USERNAMES.includes(username)

/* Accountの重複は排除していないので利用先でなんとかする必要がある */
const getTarget = async (auth: Authentication): Promise<Account[]> => {
  const notifications = await getNotifications(auth, [NtfType.Follow, NtfType.FollowRequest])
  const filtered = filterJson(notifications, DEFAULT_FILTER)
    .concat(notifications.filter((x) => usernameFilter(x.account?.username || '')))
  return filtered.map((x) => x.account).filter((x) => x != null)
}

const printArrow = new Command()
  .description('print block targets')
  .option(...JsonOption)
  .action(async ({ json }) => {
    const auth = await resolveAuth()
    const targets = await getTarget(auth)
    stdout(targets, json, `${targets.length}`)
  })

const applyArrow = new Command()
  .description("apply block. Firing Indra's arrows.")
  .action(async () => {
    const auth = await resolveAuth()
    const targets = await getTarget(auth)
    const ids = new Set(targets.map((x) => x.id))
    ids.forEach(async (id) => {
      console.log(`target=${id} result=${await postBlock(auth, id)}`)
    })
  })

export const arrow = new Command()
  .description(cGroupDesc('arrow'))
  .default('print')
  .command('print', printArrow)
  .command('apply', applyArrow)
