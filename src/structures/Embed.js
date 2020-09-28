const { RichEmbed } = require('chariot.js')

/**
 * A RichEmbed with the default fields already filled
 * @constructor
 * @param {User} [user] - The user that executed the command that resulted in this embed
 * @param {Object} [data] - Data to set in the rich embed
 */
module.exports = class CustomEmbed extends RichEmbed {
  constructor (user, data = {}) {
    super(data)
    this.setColor(process.env.EMBED_COLOR).setTimestamp()
    if (user) this.setFooter(user.tag, user.avatarURL)
  }
}
