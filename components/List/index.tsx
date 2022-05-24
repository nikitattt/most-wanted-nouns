import { Noun } from '../../utils/types'
import NounImage from '../NounImage'

const List: React.FC<{ data: Noun[] }> = (props) => {
  const { data } = props

  data.sort((x, y) => y.winningBid - x.winningBid)

  return (
    <div className="mt-20 mx-8 sm:mx-20">
      {data.map(function (noun, place) {
        const usd = Number(noun.winningBidUsd)
          .toFixed()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

        return (
          <div className="mb-8 flex flex-row gap-x-6">
            <div className="w-32 text-right my-auto">
              <p className="font-display font-bold text-7xl text-black-text">
                {place + 1}
              </p>
            </div>
            <NounImage seed={noun.seed} />
            <div className="flex flex-col justify-center gap-y-4">
              <p className="font-display font-bold text-7xl text-black-text">
                Noun {noun.id}
              </p>
              <div className="flex flex-row font-black text-5xl text-black-text">
                <div className="w-64">
                  <p className="text-blue">Ξ {noun.winningBid}</p>
                </div>
                <p className="text-green">$ {usd}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default List
