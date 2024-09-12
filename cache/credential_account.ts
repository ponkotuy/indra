import { CredentialAccount } from '../model/credential_account.ts'
import { cacheDir, loadOrElseBase } from './cache.ts'

const FILE_NAME = 'credential_account.json'
const filePath = `${cacheDir}/${FILE_NAME}`

export const loadOrElseCredentialAccount = loadOrElseBase<CredentialAccount>(filePath)
