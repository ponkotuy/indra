import { Follower } from '../model/follower.ts'
import { cacheDir, loadOrElseBase } from './cache.ts'

const DIR_NAME = 'followers'

const filePath = (id: string) => `${cacheDir}/${DIR_NAME}/${id}.json`
export const loadOrElseFollowers = (id: string) => loadOrElseBase<Follower[]>(filePath(id))
