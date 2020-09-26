const { Client: ErisClient } = require("eris");

module.exports = class Client extends ErisClient {
    constructor(token, options = {}) {
        super(token, options)
    }
    
    connect () {
        return super.connect()
    }
}
