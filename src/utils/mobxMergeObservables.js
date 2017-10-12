/**
 * Helper function that supports merging maps
 * @param target
 * @param source
 */
function mergeObservables(target, source) {
  if (!source) {
    return target
  }
  else {
    for (let key in target) {
      if(typeof source[key] !== 'undefined') {
        target[key] = Object.assign(target[key], source[key])
      }
    }
    return target
  }
}

module.exports = mergeObservables
