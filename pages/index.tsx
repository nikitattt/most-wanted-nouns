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

  return (
    <div className="font-sans bg-background text-black-text flex flex-col min-h-screen">
      <Head>
        <title>Most Wanted Nouns</title>
        <meta name="description" content="Most Wanted Nouns" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-20">
        <div className="flex flex-row ml-20 font-display items-end">
          <p className="text-8xl text-red font-bold">Most Wanted Nouns</p>
          <p className="ml-6 text-5xl pb-2 text-black-text">
            by:{' '}
            <a
              className="text-black-text underline underline-offset-4 decoration-4 decoration-red hover:text-red"
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
