import { cacheDir, loadJson, saveJson } from './cache.ts'

const FILE_NAME = 'host.json'
const filePath = `${cacheDir}/${FILE_NAME}`

export const loadHost = (): string | undefined => loadJson(filePath)?.host
export const saveHost = (host: string) => saveJson(filePath)({ host })
