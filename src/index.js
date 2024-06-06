// https://nodejs.org/api/esm.html#esm_mandatory_file_extensions

import path from 'path'
import { dirname } from 'desm'

import { getGifInfo, gif2png } from './utils/gif'
import {
  ensureGifsicleInstalled,
  ensureGifskiInstalled,
  ensureImageMagickInstalled,
} from './utils/tool'
import { parseFilePath } from './utils/file'

const __dirname = dirname(import.meta.url)

// TODO: 移除
ensureImageMagickInstalled()
ensureGifsicleInstalled()
ensureGifskiInstalled()

const gifPath = path.resolve(__dirname, '../test/demo.gif')
const gifInfo = getGifInfo(gifPath)

const pngDir = path.resolve(__dirname, '../test/png')
gif2png(gifPath, pngDir)

const pathInfo = parseFilePath(gifPath)

console.log(gifInfo)
console.log(pathInfo)
