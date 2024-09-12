import { Block } from '../model/block.ts'
import { cacheDir, loadOrElseBase } from './cache.ts'

const FILE_NAME = 'blocks.json'
const filePath = `${cacheDir}/${FILE_NAME}`

export const loadOrElseBlocks = loadOrElseBase<Block[]>(filePath)
