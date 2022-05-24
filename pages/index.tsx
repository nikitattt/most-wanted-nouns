import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { PrismaClient } from '@prisma/client'
import { Noun } from '../utils/types'
import List from '../components/List'
import Selectors from '../components/Selectors'

const prisma = new PrismaClient()

const Home: NextPage<{ nounsData: string }> = (props) => {
  const { nounsData } = props

  // TODO: exact cast doesn't happen with '234.56' to number
  const data: Noun[] = JSON.parse(nounsData)

  // TODO: update links after moving to custom domain
  return (
    <div className="font-sans bg-background text-black-text flex flex-col min-h-screen">
      <Head>
        <title>Most Wanted Nouns</title>

        <meta name="title" content="Most Wanted Nouns" />
        <meta
          name="description"
          content="What nouns have drained ETH and USD bags the most."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mostwantednouns.netlify.app" />
        <meta property="og:title" content="Most Wanted Nouns" />
        <meta
          property="og:description"
          content="What nouns have drained ETH and USD bags the most."
        />
        <meta
          property="og:image"
          content="https://mostwantednouns.netlify.app/share_image.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://mostwantednouns.netlify.app"
        />
        <meta property="twitter:title" content="Most Wanted Nouns" />
        <meta
          property="twitter:description"
          content="What nouns have drained ETH and USD bags the most."
        />
        <meta
          property="twitter:image"
          content="https://mostwantednouns.netlify.app/share_image.png"
        />

        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#F2F2F2" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#F2F2F2" />
      </Head>
      <main className="mt-20">
        <div className="flex flex-col lg:flex-row ml-8 sm:ml-20 gap-6 font-display items-start lg:items-end">
          <p className="text-8xl text-red font-bold">Most Wanted Nouns</p>
          <p className="text-5xl pb-2 text-grey">
            by:{' '}
            <a
              className="text-blue underline underline-offset-4 decoration-4 decoration-blue hover:decoration-red"
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/nikitago_"
            >
              @ng
            </a>
          </p>
        </div>
        <Selectors />
        <List data={data} />
      </main>
      <footer></footer>
    </div>
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side.
//
// As the number of nouns are still rather small(<1000) site can be static
// with all data preloaded during build.
//
// Might be worth reconsidering approach as DAO grow and preloading
// thousands of data point will be too heavy and it'll worth moving to
// partial data preloading
export const getStaticProps: GetStaticProps = async (context) => {
  const result = await prisma.noun.findMany({
    include: {
      seed: true
    }
    // take: 20
  })

  const nounsData = JSON.stringify(result)

  return {
    props: {
      nounsData
    }
  }
}

export default Home
