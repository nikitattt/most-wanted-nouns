import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createClient } from 'wagmi'
import { providers } from 'ethers'

const alchemyId = process.env.ALCHEMY_ID

const client = createClient({
  provider(config) {
    return new providers.AlchemyProvider(config.chainId, alchemyId)
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

export default MyApp
