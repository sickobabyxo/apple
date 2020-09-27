const { Command } = require("../../")
const util = require("util")

module.exports = class Eval extends Command {
    constructor(client) {
        super({
            name: "eval",
            aliases: ["ev"],
            group: "basic",
            requirements: { devsOnly: true }
        }, client)
    }

    async run({ message, channel, author, guild }, args) {
        try {
            const expression = args[1] ? args.join(' ') : args[0]

            const evaled = await eval(expression.replace(/(^`{3}(\w+)?|`{3}$)/g, ''))
            const cleanEvaled = this.clean(util.inspect(evaled, { depth: 0 }))
                .replace(this.client.token, "*******************")

            const string = `\`\`\`js\n${cleanEvaled}\`\`\``

            await channel.createMessage(string)
        } catch (err) {
            await channel.createMessage('`ERROR` ```xl\n' + this.clean(err) + '\n```')
        }
    }

    clean (text) {
        const blankSpace = String.fromCharCode(8203)
        return typeof text === 'string' ? text.replace(/`/g, '`' + blankSpace).replace(/@/g, '@' + blankSpace) : text
    }
}
