import clsx from 'clsx'

export enum Currency {
  eth,
  usd
}

const currencyToText: Record<Currency, string> = {
  [Currency.eth]: 'ETH',
  [Currency.usd]: 'USD'
}

const CurrencySelector: React.FC<{ currency: Currency }> = (props) => {
  const { currency } = props

  const selected = false

  return (
    <button
      onClick={() => {}}
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
