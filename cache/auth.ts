import { cacheDir, loadJson, saveJson } from './cache.ts'

const FILE_NAME = 'auth.json'
const filePath = `${cacheDir}/${FILE_NAME}`

const loadAuth = (): string | undefined => {
  const json = loadJson(filePath)
  return json?.['token']
}

export const loadOrElseAuth = async (gen: () => Promise<string>): Promise<string> => {
  const maybeToken = loadAuth()
  if (maybeToken != undefined) return Promise.resolve(maybeToken)
  const token = await gen()
  saveJson(filePath)({ token })
  return token
}
