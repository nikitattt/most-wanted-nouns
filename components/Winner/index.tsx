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

  // TODO: make responsive text truncation
  return (
    <div className="flex flex-col gap-2 lg:flex-row self-center lg:self-end pb-1 font-display font-bold text-4xl">
      <p className="flex-none text-grey">Winner:</p>
      <div className="max-w-[274px] md:max-w-5xl lg:max-w-sm xl:max-w-md 2xl:max-w-full">
        <a
          className=" text-blue hover:underline decoration-4 decoration-red"
          target="_blank"
          rel="noreferrer"
          href={etherscanLink}
        >
          <p className="truncate min-w-0">{data ? data : addressToShow}</p>
        </a>
      </div>
    </div>
  )
}

export default Winner
