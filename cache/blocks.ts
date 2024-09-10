import { Block } from '../model/block.ts'
import { cacheDir, loadJson, saveJson } from './cache.ts'

const BLOCKS_FILE_NAME = 'blocks.json'
const blocksFilePath = `${cacheDir}/${BLOCKS_FILE_NAME}`

export const loadOrElseBlocks = async (gen: () => Promise<Block[]>): Promise<Block[]> => {
  const maybe = loadJson(blocksFilePath)
  if (maybe != undefined) return maybe
  const blocks = await gen()
  saveJson(blocksFilePath)(blocks)
  return blocks
}
