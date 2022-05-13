import type * as fn from '../server/rpc'

export const rpc = new Proxy({},
  {
    get(_, name) {
      return (...args: any[]) => {
        return $fetch('/api/rpc', {
          method: 'POST',
          body: {
            method: name,
            args,
          },
        })
      }
    },
  },
) as typeof fn
