import { Account } from '../model/acccount.ts'
import { cacheDir, loadOrElseBase } from './cache.ts'

const DIR_NAME = 'followers'

const filePath = (id: string) => `${cacheDir}/${DIR_NAME}/${id}.json`
export const loadOrElseFollowers = (id: string) => loadOrElseBase<Account[]>(filePath(id))
