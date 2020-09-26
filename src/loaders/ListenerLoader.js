const { Loader, Listener } = require('../')

module.exports = class ListenerLoader extends Loader {
    constructor (client) {
        super({ name: 'Listener', critical: true }, client)
    }

    load () {
        return this.loadFiles('src/listeners', true)
    }

    loadFile (NewListener) {
        const listener = new NewListener(this.client)
        if (!(listener instanceof Listener)) {
            throw new Error(`Failed to load ${NewListener.name}: not an instanceof listener.`)
        }

        const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

        listener.events.forEach(event => {
            this.client.on(event, (...args) => listener['on' + capitalize(event)](...args))
        })

        return true
    }
}