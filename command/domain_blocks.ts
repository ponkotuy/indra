import { Command } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'
import { resolveAuth } from '../util/auth.ts'
import { loadOrElseDomainBlocks } from '../cache/domain_blocks.ts'
import { getDomainBlocks, postDomainBlock, deleteDomainBlock } from '../mastodon/domain_blocks.ts'
import { FilterOption, JsonOption } from './options.ts'
import { cGroupDesc, stdout } from './util.ts'

const printDomainBlocks = new Command()
  .description('print all domain blocks')
  .option(...FilterOption)
  .option(...JsonOption)
  .action(async ({ filter, json }) => {
    const regex = new RegExp(filter)
    const auth = await resolveAuth()
    const domains = await loadOrElseDomainBlocks(() => getDomainBlocks(auth))
      .then((xs) => xs.filter((x) => regex.test(x)))
    stdout(domains, json, `${domains.length}`)
  })

const addDomainBlock = new Command()
  .description('block a domain')
  .arguments('<domain:string>')
  .action(async (_options, domain) => {
    const auth = await resolveAuth()
    const status = await postDomainBlock(auth, domain)
    console.log(`blocked ${domain}: ${status}`)
  })

const removeDomainBlock = new Command()
  .description('unblock a domain')
  .arguments('<domain:string>')
  .action(async (_options, domain) => {
    const auth = await resolveAuth()
    const status = await deleteDomainBlock(auth, domain)
    console.log(`unblocked ${domain}: ${status}`)
  })

export const domainBlocks = new Command()
  .description(cGroupDesc('domain-blocks'))
  .default('print')
  .command('print', printDomainBlocks)
  .command('add', addDomainBlock)
  .command('remove', removeDomainBlock)
