import { NtfType } from '../mastodon/notifications.ts'
import { Account } from './acccount.ts'

export interface Notification {
  readonly id: string
  readonly type: NtfType
  readonly created_at: string
  readonly account?: Account
}
