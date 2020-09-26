const { Listener, CommandContext } = require('../')

const i18next = require("i18next")

module.exports = class MessageListener extends Listener {
    constructor (client) {
        super({
            events: ['messageCreate']
        }, client)
	}
	
	onMessageCreate(message) {
		if (message.author.bot || message.channel.type !== 0) return

		const prefix = process.env.PREFIX || "ub!"
		const language = "pt-BR"
		const args = message.content.slice(prefix.length).trim().split(/ +/g)

		const cmd = args.shift().toLowerCase()
		const command = this.client.commands.find(
			c => c.name.toLowerCase() === cmd || (c.aliases && c.aliases.includes(cmd))
		)

		if (!command) return

		const context = new CommandContext({
			client: this.client,
			prefix,
			message
		})

		context.setFixedT(i18next.getFixedT(language))		
		command._run(context, args).catch(console.error)
	}
}
