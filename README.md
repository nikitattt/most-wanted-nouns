# Most Wanted Nouns

## Stack

This website is built with React framework Next(SSG), TailwindCSS(styling), Prisma(ORM), wagmi(ENS), Netlify Functions

Uses:

- PlanetScale for MySQL database
- Alchemy provider for accessing blockchain data

## Getting Started

### Storage

This website is intended to work with MySQL database to store data.

Make sure you set up server with MySQL DB and have URL to access it. (Author used PlanetScale as db infrastructure provider)

Then rename `.env.example` file to `.env` and update `DATABASE_URL` in it:

```bash
DATABASE_URL="mysql://<your link should be here>"
```

Make sure to run:

1. `npx prisma db push` to upload the tables schema

2. `npx prisma generate` to generate local Prisma classes

3. `node scripts/initialize.js <id of the latest auctioning noun>` to populate db with the latest data. You need to call this only once. Make sure that you pass `id` of the last auctioning noun. Get it here: [nouns.wtf](https://nonouns.wtf). This function uses `api.thegraph.com` for loading nouns data from blockchain and `api.coinbase.com/v2` for loading ETH-USD rates.

### ENS Names

Then rename `.env.local.example` file to `.env.local` and update `ALCHEMY_ID` in it:

```bash
ALCHEMY_ID=<your alchemy id here>
```

This is needed to resole ENS domain names and show them instead of barebone addresses.

Then, you can run it locally on development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
