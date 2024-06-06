import fse from 'fs-extra'
import { createCanvas } from 'canvas'

export function createPngs({ width, height, count, outputDir }) {
  fse.ensureDirSync(outputDir)

  if (count <= 0) return

  for (let i = 0; i < count; i++) {
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    const x = i % width
    const y = Math.floor(i / width)

    // TODO: 设置更低的不透明度似乎不行？为什么第一二帧看不到或效果不明显？
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    ctx.fillRect(x, y, 1, 1)

    const suffix = i.toString().padStart(4, '0')
    const pngFilePath = `${outputDir}/frame_${suffix}.png`

    fse.writeFileSync(pngFilePath, canvas.toBuffer('image/png'))
  }

  console.log('png: created 🎉')
}

export function renamePngs(inputDir) {
  const pngRegByMagick = /^frame-(\d+)\.png$/
  const pngRegByCreated = /^frame_(\d{4})\.png$/

  const files = fse.readdirSync(inputDir)
  let startIndex = files.filter(files => pngRegByCreated.test(files)).length - 1
  if (startIndex < 0) startIndex = 0

  const renameFiles = files
    .filter(files => pngRegByMagick.test(files))
    .sort((a, b) => {
      const aIndex = parseInt(pngRegByMagick.exec(a)[1])
      const bIndex = parseInt(pngRegByMagick.exec(b)[1])
      return aIndex - bIndex
    })

  renameFiles.forEach((file, index) => {
    const suffix = (startIndex + index).toString().padStart(4, '0')
    const pngFilePath = `${inputDir}/${file}`
    const newPngFilePath = `${inputDir}/frame_${suffix}.png`
    fse.renameSync(pngFilePath, newPngFilePath)
  })

  console.log('png: renamed 🎉')
}
