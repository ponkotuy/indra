import { cacheDir, loadOrElseBase } from './cache.ts'

const FILE_NAME = 'domain_blocks.json'
const filePath = `${cacheDir}/${FILE_NAME}`

export const loadOrElseDomainBlocks = loadOrElseBase<string[]>(filePath)
