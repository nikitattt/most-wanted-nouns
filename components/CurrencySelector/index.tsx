import clsx from 'clsx'
import { Currency, State, useStore } from '../../state/state'

const currencyToText: Record<Currency, string> = {
  [Currency.eth]: 'ETH',
  [Currency.usd]: 'USD'
}

const CurrencySelector: React.FC<{ currency: Currency }> = (props) => {
  const { currency } = props

  const stateCurrency = useStore((state: State) => state.currency)

  const selected = stateCurrency === currency

  const select = useStore((state: State) =>
    currency === Currency.eth ? state.setEthCurrency : state.setUsdCurrency
  )

  return (
    <button
      onClick={select}
      className={clsx(
        'px-8 py-2 bg-opacity-20 rounded-full',
        selected ? 'text-green bg-green' : 'text-blue bg-blue'
      )}
    >
      <p className="font-display font-bold text-2xl">
        {currencyToText[currency]}
      </p>
    </button>
  )
}

export default CurrencySelector
