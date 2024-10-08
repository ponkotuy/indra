import { resolveAuth } from '../util/auth.ts'
import { loadOrElseBlocks } from '../cache/blocks.ts'
import { getBlocks } from '../mastodon/blocks.ts'
import { Command } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'
import { ElementsOption, FilterOption, JsonOption } from './options.ts'
import { stdout } from './util.ts'

export const printBlocks = new Command()
  .description('print all blocks')
  .option(...FilterOption)
  .option(...ElementsOption)
  .option(...JsonOption)
  .action(async ({ filter, elements, json }) => {
    const regex = new RegExp(filter)
    const auth = await resolveAuth()
    const blocks = await loadOrElseBlocks(() => getBlocks(auth))
      .then((xs) => xs.filter((x) => regex.test(JSON.stringify(x))))
      .then((xs) => elements ? xs.map((x) => extractElements(x, elements)) : xs)
    stdout(blocks, json, `${blocks.length}`)
  })

// deno-lint-ignore no-explicit-any
const extractElements = (block: any, elements: string[]) => Object.fromEntries(elements.map((e) => [e, block[e]]))
