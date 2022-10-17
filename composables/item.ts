import { useSingleton } from './utils'
import type { Image, Media, Video } from '~/types'

export function getTrailer(item: Media) {
  const trailer = item.videos?.results?.find(video => video.type === 'Trailer')
  return getVideoLink(trailer)
}

export function getVideoLink(item?: Video) {
  if (!item?.key)
    return null
  return `https://www.youtube.com/embed/${item.key}?rel=0&showinfo=0&autoplay=0`
}

const [
  provideIframeModal,
  useIframeModal,
] = useSingleton<(url: string) => void>()

const [
  provideImageModal,
  useImageModal,
] = useSingleton<(photos: Image[], index: number) => void>()

export {
  useIframeModal,
  provideIframeModal,
  useImageModal,
  provideImageModal,
}
