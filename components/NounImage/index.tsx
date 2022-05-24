import { Seed } from '../../utils/types'

import { ImageData, getNounData } from '@nouns/assets'
import { buildSVG } from '@nouns/sdk/dist/image/svg-builder'

const { palette } = ImageData

const NounImage: React.FC<{ seed: Seed }> = (props) => {
  const { seed } = props

  const { parts, background } = getNounData(seed)

  const svgBinary = buildSVG(parts, palette, background)
  const svgBase64 = Buffer.from(svgBinary).toString('base64')

  return (
    <div className="w-48 h-48">
      <img
        className="rounded-2xl"
        src={`data:image/svg+xml;base64,${svgBase64}`}
      />
    </div>
  )
}

export default NounImage
