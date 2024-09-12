import { Command } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'
import { printBlocks } from './print_blocks.ts'

export const blocks = new Command()
  .default('print')
  .command('print', printBlocks)
