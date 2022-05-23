import type { Media, Video } from '~/types'

export function getTrailer(item: Media) {
  const trailer = item.videos?.results?.find(video => video.type === 'Trailer')
  return getVideoLink(trailer)
}

export function getVideoLink(item?: Video) {
  if (!item?.key)
    return null
  return `https://www.youtube.com/embed/${item.key}?rel=0&showinfo=0&autoplay=1`
}

export function useIframeModal() {
  const fn = inject<any>('iframe-modal')!
  return fn as (url: string) => void
}
