const CommandError = require("./CommandError.js")

module.exports = class CommandRequirements {
  static parseOptions(options = {}) {
    return {
      botPermissions: options.botPermissions || [],
      permissions: options.permissions || [],

      voiceChannelonly: !!options.voiceChannelonly,
      sameVoiceChannelOnly: !!options.sameVoiceChannelOnly,

      guildOnly: !!options.guildOnly || true,
      devsOnly: !!options.devsOnly || false
    }
  }


  static handle ({ t, author, channel, client, guild, member, voiceChannel }, options) {
    const opts = this.parseOptions(options)

    if(opts.guildOnly && channel.type === "dm") return

    if(opts.devsOnly) {
      const supportServer = client.guilds.get("746389227591434251")

      const memberGuild = supportServer.members.get(author.id)

      const isDeveloper = (memberGuild && memberGuild.roles.includes("753286861430063114"))
      if (!isDeveloper) return
    }

    if (opts.sameVoiceChannelOnly && guild.me.voiceChannelID && (!voiceChannel || guild.me.voiceChannelID !== voiceChannel.id)) {
      throw new CommandError(t("errors:sameVoiceChannelOnly"))
    }

    if (opts.voiceChannelOnly && !voiceChannel) {
      throw new CommandError(t("errors:voiceChannelOnly"))
    }

    if (opts.permissions && opts.permissions.length > 0) {
        if (!channel.permissionsOf(member.id).has(opts.permissions)) {
            const permissions = opts.permissions
                .map(p => !member.permission.has(p) && t(`permissions:discord.${p}`))
                .map(p => `**"${p}"**`).join(", ")
            const sentence = opts.permissions.length >= 1 ? "errors:missingOnePermission" : "errors:missingMultiplePermissions"
            throw new CommandError(t(sentence, { permissions }))
        }
    }

    if (opts.botPermissions && opts.botPermissions.length > 0) {
        const clientAsMember = guild.members.get(this.client.user.id)
        if (!channel.permissionsOf(clientAsMember.id).has(opts.botPermissions)) {
            const permissions = opts.botPermissions
                .map(p => !clientAsMember.permission.has(p) && t(`permissions:discord.${p}`))
                .map(p => `**"${p}"**`).join(", ")
            const sentence = opts.permissions
            throw new CommandError(t(sentence, { permissions }))
        }
    }
  }
}
