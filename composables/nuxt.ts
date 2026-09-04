import type { ComputedRef } from 'vue'

export function useRouteParam<T>(name: string, init?: T): ComputedRef<T> {
  const route = useRoute()
  return computed(() => ((route.params as Record<string, unknown>)[name] ?? init) as T)
}
