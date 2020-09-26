const { Loader, Command } = require('../')

module.exports = class CommandLoader extends Loader {
    constructor (client) {
        super({ name: 'Command', critical: true }, client)

        this.client.commands = []
    }

    load () {
        return this.loadFiles('src/commands', true)
    }

    loadFile (NewCommand) {
        const command = new NewCommand(this.client)

        if (!(command instanceof Command)) {
            throw new Error(`Failed to load ${NewCommand.name}: not an instanceof command.`)
        }

        this.client.commands.push(command)

        return true
    }
}
