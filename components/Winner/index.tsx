import clsx from 'clsx'
import { useEnsName } from 'wagmi'

const Winner: React.FC<{ address: string }> = (props) => {
  const { address } = props

  const { data } = useEnsName({
    address: address
  })

  const addressToShow =
    address.slice(0, 6) +
    '...' +
    address.slice(address.length - 4, address.length)

  const etherscanLink = `https://etherscan.io/address/${address}`

  return (
    <div className="self-center lg:self-end pb-1">
      <p className="font-display font-bold text-4xl text-grey">
        Winner:{' '}
        <a
          className="text-blue hover:underline decoration-4 decoration-red"
          target="_blank"
          rel="noreferrer"
          href={etherscanLink}
        >
          {data ? data : addressToShow}
        </a>
      </p>
    </div>
  )
}

export default Winner
