import { Command } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'
import { printBlocks } from './print_blocks.ts'
import { cGroupDesc } from './util.ts'

export const blocks = new Command()
  .description(cGroupDesc('blocks'))
  .default('print')
  .command('print', printBlocks)
