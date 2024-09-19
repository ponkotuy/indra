import { App } from '../model/app.ts'
import { cacheDir, loadJson, loadOrElseBase } from './cache.ts'

const FILE_NAME = 'app.json'
const filePath = `${cacheDir}/${FILE_NAME}`

export const loadOrElseApp = loadOrElseBase<App>(filePath)
export const loadApp = (): App | undefined => loadJson(filePath)
