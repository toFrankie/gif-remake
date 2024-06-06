import path from 'path'

export function parseFilePath(filePath) {
  const normalizedFilePath = path.normalize(filePath)

  const dir = path.dirname(normalizedFilePath)
  const basename = path.basename(normalizedFilePath)
  const extname = path.extname(normalizedFilePath)
  const filename = path.basename(normalizedFilePath, extname)

  return {
    path: normalizedFilePath,
    dir,
    basename, // 文件名（含扩展名）
    filename, // 文件名（不含扩展名）
    extname, // 扩展名（含前导 .）
  }
}
