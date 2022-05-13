import type * as fn from '../server/functions'

export const functions = {
  /**
   * Use GET request, with better browser caching.
   */
  get: new Proxy({}, {
    get(_, name) {
      return (...args: any[]) => {
        return $fetch('/api/functions', {
          method: 'GET',
          params: {
            name,
            args: JSON.stringify(args),
          },
        })
      }
    },
  }) as typeof fn,
  /**
   * Use POST request, could pass larger arguments.
   */
  post: new Proxy({}, {
    get(_, name) {
      return (...args: any[]) => {
        return $fetch('/api/functions', {
          method: 'POST',
          body: {
            name,
            args,
          },
        })
      }
    },
  }) as typeof fn,

}
