import clsx from 'clsx'
import { Order, State, useStore } from '../../state/state'

const orderToText: Record<Order, string> = {
  [Order.asc]: 'COST DOWN',
  [Order.desc]: 'COST UP'
}

const OrderSelector: React.FC<{ order: Order }> = (props) => {
  const { order } = props

  const stateOrder = useStore((state: State) => state.order)

  const selected = stateOrder === order

  const select = useStore((state: State) =>
    order === Order.asc ? state.setAscOrder : state.setDescOrder
  )

  return (
    <button
      onClick={select}
      className={clsx(
        'px-8 py-2 bg-opacity-20 rounded-full',
        selected ? 'text-green bg-green' : 'text-blue bg-blue'
      )}
    >
      <p className="font-display font-bold text-2xl">{orderToText[order]}</p>
    </button>
  )
}

export default OrderSelector
