const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function data(totalNouns) {
  const aggregations = await prisma.noun.aggregate({
    _avg: {
      winningBidUsd: true
    }
  })
  const data = await prisma.noun.findMany()

  let totalUsd = 0.0
  data.forEach((d) => {
    totalUsd = totalUsd + Number(d.winningBidUsd)
  })
  console.log('-------- USD -------')
  console.log(data[data.length - 1].id)
  console.log('---------------')
  const avg = totalUsd / data.length
  console.log(totalUsd)
  console.log(avg)
  console.log(aggregations._avg.winningBidUsd)

  // --------------------------

  const aggregationsEth = await prisma.noun.aggregate({
    _avg: {
      winningBid: true
    }
  })
  const dataEth = await prisma.noun.findMany()

  let totalEth = 0.0
  dataEth.forEach((d) => {
    totalEth = totalEth + Number(d.winningBid)
  })
  const avgEth = totalEth / dataEth.length
  console.log('-------- ETH -------')
  console.log(dataEth[dataEth.length - 1].id)
  console.log('---------------')
  console.log(totalEth)
  console.log(avgEth)
  console.log(aggregationsEth._avg.winningBid)
}

const totalNouns = parseInt(process.argv[2])

data(totalNouns)
