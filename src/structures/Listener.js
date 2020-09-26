const { createOptionHandler } = require('../utils')

module.exports = class Listener {
  constructor (options, client) {
    options = createOptionHandler('Listener', options)

    this.events = options.optional('events', [])

    this.client = client
  }

  listen () {
    return null
  }
}
