import create from 'zustand'

export enum Order {
  desc,
  asc
}

export enum Currency {
  eth,
  usd
}

export interface State {
  order: Order
  currency: Currency
  setDescOrder: () => void
  setAscOrder: () => void
  setEthCurrency: () => void
  setUsdCurrency: () => void
}

export const useStore = create<State>((set) => ({
  order: Order.desc,
  currency: Currency.eth,
  setDescOrder: () => set({ order: Order.desc }),
  setAscOrder: () => set({ order: Order.asc }),
  setEthCurrency: () => set({ currency: Currency.eth }),
  setUsdCurrency: () => set({ currency: Currency.usd })
}))
