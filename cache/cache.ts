import xdg from 'https://deno.land/x/xdg_portable@v10.6.0/src/mod.deno.ts'

const INDRA_DIR = '/indra'
export const cacheDir = xdg.cache() + INDRA_DIR

const useDir = <T>(f: (dir: string) => T): T => {
  Deno.mkdirSync(cacheDir, { recursive: true })
  return f(cacheDir)
}

// deno-lint-ignore no-explicit-any
export const saveJson = (fname: string) => (data: any) => {
  useDir(() => {
    Deno.writeTextFileSync(fname, JSON.stringify(data))
  })
}

// deno-lint-ignore no-explicit-any
export const loadJson = (fname: string): any => {
  try {
    const text = Deno.readTextFileSync(fname)
    return JSON.parse(text)
  } catch {
    return undefined
  }
}
