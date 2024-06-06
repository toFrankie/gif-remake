export function getAverageDelay(list) {
  const map = {}
  for (let i = 0; i < list.length; i++) {
    const key = list[i]
    if (map[key]) {
      map[key]++
    } else {
      map[key] = 1
    }
  }

  let max = 0
  let maxKey = null
  for (let key in map) {
    if (map[key] > max) {
      max = map[key]
      maxKey = key
    }
  }

  return Number(maxKey)
}
