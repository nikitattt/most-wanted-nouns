import { Currency, Order } from '../../state/state'
import CurrencySelector from '../CurrencySelector'
import OrderSelector from '../OrderSelector'

const Selectors: React.FC<{}> = (props) => {
  return (
    <div className="mt-20 mx-20 flex flex-col gap-6">
      <p className="font-display font-bold text-5xl text-grey">Sort by:</p>
      <div className="flex flex-row gap-4">
        <OrderSelector order={Order.desc} />
        <OrderSelector order={Order.asc} />
        <div className="w-6" />
        <CurrencySelector currency={Currency.eth} />
        <CurrencySelector currency={Currency.usd} />
      </div>
    </div>
  )
}

export default Selectors
