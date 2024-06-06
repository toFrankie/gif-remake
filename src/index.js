// https://nodejs.org/api/esm.html#esm_mandatory_file_extensions

import path from 'path'
import { dirname } from 'desm'

import { getGifInfo } from './utils/gif'
import {
  ensureGifsicleInstalled,
  ensureGifskiInstalled,
  ensureImageMagickInstalled,
} from './utils/tool'

const __dirname = dirname(import.meta.url)

// TODO: 移除
ensureImageMagickInstalled()
ensureGifsicleInstalled()
ensureGifskiInstalled()

const gifPath = path.resolve(__dirname, '../test/demo.gif')
const gifInfo = getGifInfo(gifPath)

console.log(gifInfo)
