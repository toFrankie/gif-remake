// https://nodejs.org/api/esm.html#esm_mandatory_file_extensions

import path from 'path'
import { dirname } from 'desm'

import { getGifInfo, gif2png, png2gif } from './utils/gif'
import { createPngs, renamePngs } from './utils/png'
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

const pngDir = path.resolve(__dirname, '../test/png')

gif2png(gifPath, pngDir)
createPngs({ width: 350, height: 300, count: 13, outputDir: pngDir })
renamePngs(pngDir)
// TODO: 重新合并时要求 png 宽高要一致。
png2gif(pngDir, gifPath, 400)

// console.log(gifInfo)
