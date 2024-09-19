import { cacheDir, loadOrElseString } from './cache.ts'

const FILE_NAME = 'auth.json'
const filePath = `${cacheDir}/${FILE_NAME}`

export const loadOrElseToken = loadOrElseString(filePath, 'token')
