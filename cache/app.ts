import { App } from '../model/app.ts'
import { cacheDir, loadJson, saveJson } from './cache.ts'

const FILE_NAME = 'app.json'
const filePath = `${cacheDir}/${FILE_NAME}`

export const loadApp = (): App | undefined => loadJson(filePath)
export const saveApp = saveJson(filePath)
