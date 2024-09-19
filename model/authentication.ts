import { App } from './app.ts'

export interface Authentication {
  readonly host: string
  readonly token: string
  readonly app: App
}
