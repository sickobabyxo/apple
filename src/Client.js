const { Client: ErisClient } = require('eris')
const { red, green, magenta } = require('chalk')

module.exports = class Client extends ErisClient {
    constructor(token, options = {}) {
        super(token, options)
    }

    connect () {
        return super.connect()
    }

    console (error, message, label) {
        const isError =  error ? red('[ERROR]') : green('[Success]')
        console.log(`${isError} ${message} ${magenta(label)}`)
    }

    initializeLoaders() {

    }
}
