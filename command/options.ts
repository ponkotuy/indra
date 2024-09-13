import { OptionOptions } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts'

type OptionTuple = [string, string, OptionOptions?]

export const FilterOption: OptionTuple = ['-f, --filter <regex:string>', 'filter output', { default: '' }]
export const ElementsOption: OptionTuple = ['-e, --elements <elem...:string>', 'print only json element']
export const IdOption: OptionTuple = ['--id <id:string>', 'set account id. default: credential id']
export const JsonOption: OptionTuple = ['-j, --json', 'output only json(to use jq)', { default: false }]
