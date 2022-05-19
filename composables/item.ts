import type { Item } from '~~/types'

export function getTrailer(item: Item) {
  const trailer = item.videos?.results?.find(video => video.type === 'Trailer')

  if (!trailer)
    return null

  return {
    name: trailer.name,
    src: `https://www.youtube.com/embed/${trailer.key}?rel=0&showinfo=0&autoplay=1`,
  }
}
