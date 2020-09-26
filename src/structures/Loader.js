const { createOptionHandler, FileUtils } = require("../utils")

module.exports = class Loader {
  /**
   * @param {Object} opts
   * @param {boolean} [opts.critical]
   * @param {Client} client
   */
  constructor (options, client) {
    options = createOptionHandler("Loader", options)

    this.critical = options.optional("critical", false)

    this.name = options.optional("name", this.constructor.name)

    this.client = client
  }

  async preLoad () {
    try {
      const success = await this.load()
      if (!success) throw new Error("Unhandled error")
      return success
    } catch (e) {
      console.log(e)
      return false
    }
  }

  async loadFiles (path, recursive = false) {
    if (!path || typeof path !== "string") throw new TypeError(`The 'path' argument on '${this.constructor.name}.loadFiles()' must be a string. Received ${typeof path} instead.`)
    let success = 0
    let fails = 0
    const errorFunction = e => {
      console.log(e.stack || e)
      fails++
    }
    const successFunction = (file, fileName) => {
      try {
        if (this.loadFile(file)) {
         // console.log(`[${this.name}] Loaded ${fileName}`)
          success++
        } else {
          console.log(`[${this.name}] Failed to load ${fileName}`)
          throw new Error(`'${this.constructor.name}.loadFile()' returned an unhandled error.`)
        }
      } catch (e) {
        errorFunction(e)
      }
    }
    await FileUtils.requireDirectory(path, successFunction, errorFunction, recursive).then(() => {
      if (fails) this.client.console(false, `${success} types of ${this.name} loaded, ${fails} failed.`, "Loaders")
      else this.client.console(false, `All ${success} types of ${this.name} loaded without errors.`, "Loaders")
    })
    return true
  }

  async load () {
    return true
  }

  loadFile (file) {
    throw new Error(`The ${this.name} loader has not implemented the loadFile() function`)
  }
}
