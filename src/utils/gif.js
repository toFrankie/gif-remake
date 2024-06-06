import fse from 'fs-extra'
import { execSync } from 'child_process'
import { ensureImageMagickInstalled } from './tool'
import { parseFilePath } from './file'

export function getGifInfo(gifPath) {
  ensureImageMagickInstalled()

  // https://www.imagemagick.org/script/escape.php
  const command = `magick identify -format "%w,%h,%T\n" "${gifPath}"`
  const buffer = execSync(command)

  const imageCharacteristics = buffer.toString().trim()
  const formattedImageCharacteristics = formatImageCharacteristics(imageCharacteristics)

  return {
    width: formattedImageCharacteristics[0].width,
    height: formattedImageCharacteristics[0].height,
    averageDelayTime: formattedImageCharacteristics[0].imageDelayTime, // 单位厘秒 TODO: 转换为毫秒
    frames: formattedImageCharacteristics,
  }
}

function formatImageCharacteristics(imageCharacteristics) {
  const images = imageCharacteristics.split('\n')
  return images.map(image => {
    const [width, height, imageDelayTime] = image.split(',') // %w,%h,%T\n
    return { width, height, imageDelayTime }
  })
}

export function gif2png(gifPath, pngDir) {
  ensureImageMagickInstalled()

  const { dir, filename, extname } = parseFilePath(gifPath)

  // unoptimize
  const unoptimizedFilePath = `${dir}/${filename}_unoptimized${extname}`
  const unoptimizedCommond = `magick ${gifPath} -coalesce ${unoptimizedFilePath}`
  execSync(unoptimizedCommond)
  console.log('unoptimized 🎉')

  // 清空目录内的文件
  fse.removeSync(pngDir)
  fse.ensureDirSync(pngDir)

  // frame-*.png
  const pngPath = `${pngDir}/frame.png`
  const splitCommand = `magick ${unoptimizedFilePath} ${pngPath}`
  execSync(splitCommand)

  // 删除临时文件
  fse.removeSync(unoptimizedFilePath)

  console.log('splited 🎉')
}
