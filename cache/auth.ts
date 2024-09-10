import { cacheDir, loadJson, saveJson } from './cache.ts'

const AUTH_FILE_NAME = 'auth.json'
const authFilePath = `${cacheDir}/${AUTH_FILE_NAME}`

const loadAuth = (): string | undefined => {
  const json = loadJson(authFilePath)
  return json?.['token']
}

export const loadOrElseAuth = (gen: () => Promise<string>): Promise<string> => {
  const maybeToken = loadAuth()
  if (maybeToken != undefined) return Promise.resolve(maybeToken)
  const token = gen()
  saveJson(authFilePath)({ token })
  return token
}
