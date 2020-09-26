const { Client: ErisClient } = require('eris')
const { red, green, magenta } = require('chalk')

const Loaders = require("./loaders")

module.exports = class Client extends ErisClient {
    constructor(token, options = {}) {
        super(token, options)
        
        this.connect()

        this.initializeLoaders()
    }

    connect () {
        return super.connect()
    }

    console (error, message, label) {
        const isError =  error ? red('ERROR') : green('Success')
        console.log(`[${isError}] [${magenta(label)}] ${message}`)
    }

    async initializeLoaders () {
        for (const file in Loaders) {
            const loader = new Loaders[file](this)
            let success = true
            try {
                success = await loader.preLoad()
            } catch (error) {
                console.error(error.stack)
            } finally {
                if (!success && loader.critical) process.exit(1)
            }
        }
    }
}
