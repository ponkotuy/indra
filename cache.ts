import xdg from 'https://deno.land/x/xdg_portable@v10.6.0/src/mod.deno.ts'

const INDRA_DIR = '/indra'
const AUTH_FILE_NAME = 'auth.json'
const dir = xdg.cache() + INDRA_DIR

const useDir = <T>(f: (dir: string) => T): T => {
  Deno.mkdirSync(dir, { recursive: true })
  return f(dir)
}

const saveJson = (fname: string) => (data: any) => {
  useDir((dir) => {
    Deno.writeTextFileSync(fname, JSON.stringify(data))
  })
}

const loadJson = (fname: string)

const loadAuth = (): string | null => {
  try {
    const text = Deno.readTextFileSync(`${dir}/${AUTH_FILE_NAME}`)
    return JSON.parse(text)['token']
  } catch {
    return null
  }
}

export const loadOrElseAuth = async (gen: () => Promise<string>): Promise<string> => {
  const fname = `${dir}/${AUTH_FILE_NAME}`
  const maybeToken = loadAuth()
  if (maybeToken !== null) return maybeToken
  const token = await gen()
  saveJson(fname)({ token })
  return token
}

export const saveBlocks = ()
