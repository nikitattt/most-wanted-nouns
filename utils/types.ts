export interface Seed {
  head: number
  glasses: number
  body: number
  accessory: number
  background: number
}

export interface Noun {
  id: number
  winningBid: number
  winningBidUsd: number
  seed: Seed
  winner: string
  winDate: Date
}
