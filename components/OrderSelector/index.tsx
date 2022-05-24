import clsx from 'clsx'

export enum Order {
  desc,
  asc
}

const orderToText: Record<Order, string> = {
  [Order.asc]: 'COST DOWN',
  [Order.desc]: 'COST UP'
}

const OrderSelector: React.FC<{ order: Order }> = (props) => {
  const { order } = props

  const selected = false

  return (
    <button
      onClick={() => {}}
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
