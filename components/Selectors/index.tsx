import CurrencySelector, { Currency } from '../CurrencySelector'
import OrderSelector, { Order } from '../OrderSelector'

const Selectors: React.FC<{}> = (props) => {
  return (
    <div className="mt-20 mx-20 flex flex-row gap-4">
      <OrderSelector order={Order.desc} />
      <OrderSelector order={Order.asc} />
      <div className="w-6" />
      <CurrencySelector currency={Currency.eth} />
      <CurrencySelector currency={Currency.usd} />
    </div>
  )
}

export default Selectors
