const { Client: ErisClient } = require("eris")
const moment = require('moment')
const getDate = () => moment.locale('pt-BR') && moment().format('lll')
const { magenta, red, blue } = require('chalk')

module.exports = class Client extends ErisClient {
    constructor(token, options = {}) {
        super(token, options)
    }

    connect () {
        return super.connect()
    }

    console (error, message, label) {
        const isError =  error ? red('[Error]') : blue('[Sucess]')
        console.log(`\x1b[32m[${getDate()}]\x1b[0m${isError} ${message} ${magenta(label)}`);
    }
}
