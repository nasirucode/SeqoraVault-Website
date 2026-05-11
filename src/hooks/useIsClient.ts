import { useSyncExternalStore } from 'react'

const subscribeNothing = () => () => {}

/** `false` during SSR and hydration’s first pass; `true` after the client is active (safe for portals). */
export function useIsClient() {
  return useSyncExternalStore(subscribeNothing, () => true, () => false)
}
