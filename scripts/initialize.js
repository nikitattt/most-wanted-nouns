const axios = require('axios');
const dayjs = require('dayjs');
const { PrismaClient } = require('@prisma/client');
const { formatUnits } = require('ethers/lib/utils');
const { BigNumber } = require('ethers');

const prisma = new PrismaClient();

async function data(totalNouns) {
  for (let i = 1; i < totalNouns; i++) {
    // Don't fetch data for nounders nouns
    if (i % 10 !== 0) {
      //
      // Get data about particular noun
      //

      const auctionData = await axios({
        url: 'https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          query: `
                    query{
                        auction(id: ${i}) {
                            amount
                            endTime
                            noun {
                              seed {
                                background
                                body
                                accessory
                                head
                                glasses
                              }
                            }
                            bidder {
                              id
                            }
                        }
                    }`
        }
      });

      //
      // Decode required noun data
      //

      const id = i;
      const winningBid = parseFloat(
        formatUnits(BigNumber.from(auctionData.data.data.auction.amount))
      ).toFixed(2);
      const winner = auctionData.data.data.auction.bidder.id;
      const winDate = dayjs.unix(auctionData.data.data.auction.endTime);

      const head = parseInt(auctionData.data.data.auction.noun.seed.head);
      const glasses = parseInt(auctionData.data.data.auction.noun.seed.glasses);
      const body = parseInt(auctionData.data.data.auction.noun.seed.body);
      const accessory = parseInt(auctionData.data.data.auction.noun.seed.accessory);
      const background = parseInt(auctionData.data.data.auction.noun.seed.background);

      //
      // Fetch ETH price on auction settle day from Coinbase
      //

      const requestDate = winDate.format('YYYY-MM-DD');
      const ethRateResponse = await axios({
        url: `https://api.coinbase.com/v2/prices/ETH-USD/spot?date=${requestDate}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const ethRate = ethRateResponse.data.data.amount;

      // Calculate price paid in USD Dollars
      const winningBidUsd = Math.round(winningBid * ethRate * 100) / 100;

      //
      // Add this noun data to database
      //

      await prisma.noun.upsert({
        where: { id: id },
        update: {
          winDate: winDate.toDate(),
          winner: winner,
          winningBid: winningBid,
          winningBidUsd: winningBidUsd,
          seed: {
            update: {
              head: head,
              glasses: glasses,
              body: body,
              accessory: accessory,
              background: background
            }
          }
        },
        create: {
          id: id,
          winDate: winDate.toDate(),
          winner: winner,
          winningBid: winningBid,
          winningBidUsd: winningBidUsd,
          seed: {
            create: {
              head: head,
              glasses: glasses,
              body: body,
              accessory: accessory,
              background: background
            }
          }
        }
      });
    }
  }
}

const totalNouns = parseInt(process.argv[2]);

data(totalNouns);
