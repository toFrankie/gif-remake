import { execSync } from 'child_process'
import { ensureImageMagickInstalled } from './tool'

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
