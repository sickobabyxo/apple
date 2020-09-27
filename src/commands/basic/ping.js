const { Command, Embed } = require("../../")
const AsciiTable = require("ascii-table")

module.exports = class Ping extends Command {
    constructor(client) {
        super({
            name: "ping",
            aliases: ['pingo'],
            group: "basic",
        }, client)
    }

    async run({ channel, t }, args) {
        switch (args[0]) {
            case "shards": {
                const table = new AsciiTable()
                    .setHeading('Shard', 'Guilds', 'Users', 'Ping')
                    .setAlign(0, AsciiTable.CENTER)
                    .setAlign(1, AsciiTable.CENTER)
                    .setAlign(2, AsciiTable.CENTER)
                    .setAlign(3, AsciiTable.CENTER)
                    .removeBorder()
                this.client.shards.forEach(shard => {
                    const guildCount = this.client.guilds.filter((g) => g.shard.id === shard.id).length
                    const userCount = Object.keys(this.client.guildShardMap).map(id => this.client.guilds.get(id).members.map(m => m.id))[shard.id].length

                    table.addRow(shard.id, guildCount, userCount, shard.latency)
                })

                channel.createMessage({ embed: new Embed().setDescription(`\`\`\`${table.toString()}\`\`\``)})
                break;
            }
            default: {

            }
        }
    }
}
