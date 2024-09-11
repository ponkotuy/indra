import { resolveAuth } from '../auth.ts'
import { loadOrElseAuth } from '../cache/auth.ts'
import { loadOrElseBlocks } from '../cache/blocks.ts'
import { getBlocks } from '../mastodon/blocks.ts'
import { Command } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'

export interface OptionProps {
  readonly filter?: string
}

export const printBlocks = new Command()
  .description('print all blocks')
  .option('-f, --filter <regex:string>', 'filter output', { default: '' })
  .option('-e, --elements <elem...:string>', 'print only json element')
  .action(async ({ filter, elements }) => {
    const regex = new RegExp(filter)
    const token = await loadOrElseAuth(resolveAuth)
    const blocks = await loadOrElseBlocks(() => getBlocks(token))
      .then((xs) => xs.filter((x) => regex.test(JSON.stringify(x))))
      .then((xs) => elements ? xs.map((x) => extractElements(x, elements)) : xs)
    console.log(blocks)
    console.log(`blocks count: ${blocks.length}`)
  })

// deno-lint-ignore no-explicit-any
const extractElements = (block: any, elements: string[]) => Object.fromEntries(elements.map((e) => [e, block[e]]))
