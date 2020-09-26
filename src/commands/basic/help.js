const { Command, Emojis } = require("../../")
const { ReactionCollector } = require("eris-collector")

module.exports = class Help extends Command {
    constructor(client) {
        super({
            name: "help",
            aliases: ["ajuda"],
            group: "basic",
        }, client)
    }

    async run({ t, author, channel, }) {
      
        const pages = ['apenas', 'um', 'teste']

        const emojis = []

        const msg = await channel.createMessage(pages[0])

        const filter = (_, emoji, userID) => userID === author.id

        const collector = new ReactionCollector(this.client, msg, filter, {
            time: 1000 * 20
        })

        for (const emoji of emojis) await msg.addReaction(emoji, this.client.id)

        collector.on("collect", (m, emoji, userID) => {
            const index = emojis.findIndex(e => e === `:${emoji.name}:${emoji.id}`)

            if (index <= -1 || !pages[index]) return

            msg.edit(pages)
        })
    }  
}
