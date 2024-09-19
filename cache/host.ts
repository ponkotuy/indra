import { cacheDir, loadJson, loadOrElseString, saveJson } from './cache.ts'

const FILE_NAME = 'host.json'
const filePath = `${cacheDir}/${FILE_NAME}`

export const loadOrElseHost = loadOrElseString(filePath, 'host')
export const loadHost = (): string | undefined => loadJson(filePath)?.host
export const saveHost = saveJson(filePath)
