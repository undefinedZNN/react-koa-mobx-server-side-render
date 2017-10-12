import mergeObservables from '../utils/mobxMergeObservables.js'
import count from './count'

const stores = {
  count
}

export const createServerState = stores

let source
if (typeof window === 'undefined') {
  source = null
}
else {
  source = window.__INITIAL_STATE__
}
export const createClientState = mergeObservables(stores, source)
