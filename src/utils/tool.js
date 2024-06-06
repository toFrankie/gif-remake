import { execSync } from 'child_process'

export function ensureImageMagickInstalled() {
  try {
    // ImageMagick v7
    execSync('magick -version', { stdio: 'ignore' })
    return true
  } catch {
    throw new Error('ImageMagick is not installed.')
  }
}

export function ensureGifsicleInstalled() {
  try {
    execSync('gifsicle --version', { stdio: 'ignore' })
    return true
  } catch {
    throw new Error('Gifsicle is not installed.')
  }
}

export function ensureGifskiInstalled() {
  try {
    execSync('gifski --version', { stdio: 'ignore' })
    return true
  } catch {
    throw new Error('Gifski is not installed.')
  }
}
