import { Account } from '../model/acccount.ts'
import { cacheDir, loadOrElseBase } from './cache.ts'

const DIR_NAME = 'account'

const filePath = (id: string) => `${cacheDir}/${DIR_NAME}/${id}.json`
export const loadOrElseAccount = (id: string) => loadOrElseBase<Account>(filePath(id))
