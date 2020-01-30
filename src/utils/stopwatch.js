const debug = require('debug')('stopwatch')

module.exports = () => {
  let t1 = Date.now()

  let watch = () => {
    let delta = parseInt((Date.now() - t1) / 1000, 10)
    debug(`step: [${delta}s]`)
    return delta
  }

  watch.reset = () => {
    t1 = Date.now()
  }

  return watch
}