export interface App {
  readonly id: string
  readonly name: string
  readonly website: string
  readonly redirect_uri: string
  readonly client_id: string
  readonly client_secret: string
  readonly vapid_key: string
}
