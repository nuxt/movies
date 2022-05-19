import type { ComputedRef } from 'vue'

export function useRouteParam<T>(name: string, init?: T): ComputedRef<T> {
  const route = useRoute()
  return computed(() => route.params[name] as any ?? init)
}
