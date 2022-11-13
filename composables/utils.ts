import LANGUAGES from '~/constants/languages'

export function formatDate(string: string) {
  const locale = useNuxtApp().$i18n.locale
  const date = new Date(string).toLocaleDateString(unref(locale))
  return date
}

/**
 * Format minutes into hours and mins
 */
export function formatTime(minutes: number) {
  // seconds
  const seconds = minutes * 60
  let secondsLeft = seconds

  // hours
  const hours = Math.floor(secondsLeft / 3600)
  secondsLeft = secondsLeft % 3600

  // mins
  const mins = Math.floor(secondsLeft / 60)
  secondsLeft = secondsLeft % 60

  return `${hours ? `${hours}h` : ''} ${mins}min`
}

export function numberWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function formatLang(iso: string) {
  const fullLang = LANGUAGES.find(lang => lang.iso_639_1 === iso)

  if (fullLang)
    return fullLang.english_name

  return iso
}

export function useSingleton<T>() {
  const key = Symbol('singleton')
  return [
    function provide(v: T) {
      const vm = getCurrentInstance()
      vm?.appContext.app.provide(key, v)
    },
    function use(fallback?: T) {
      return inject(key, fallback) as T
    },
  ] as const
}
