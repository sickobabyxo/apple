const { Loader } = require('../')
const fetch = require('node-fetch')

module.exports = class EmojiLoader extends Loader {
  constructor (client) {
    super({}, client)

    this.version = 7
    this.baseURL = 'https://discord.com/api'
    this.officialEmojis = []
  }

  async load () {
    try {
      await this.getAndStoreEmojis()
      this.client.officialEmojis = this.officialEmojis
      this.client.officialEmojis.get = this.getEmoji
      return true
    } catch (e) {
      console.log(e)
    }
    return false
  }

  /**
   * Fetches and stores all required emojis.
   */
  async getAndStoreEmojis () {
    const emojiGuilds = process.env.EMOJI_GUILDS && process.env.EMOJI_GUILDS.split(',')
    if (!emojiGuilds) return console.log(`Required emojis not loaded - Required environment variable "EMOJI_GUILDS" is not set.`)

    await Promise.all(emojiGuilds.map(async guild => {
      return fetch(`${this.baseURL}/v${this.version}/guilds/${guild}/emojis`, {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`
        }
      }).then(res => res.json()).then(emojis => {
        if (emojis) this.officialEmojis = this.officialEmojis.concat(emojis)
        console.log(`Loaded ${emojis.length || 0} emojis from ${guild}.`)
      }).catch(e => {
        console.log(`Failed to fetch emojis from ${guild}`)
      })
    }))

    console.log(`All ${this.officialEmojis.length} emojis stored without errors.`)
  }

  /**
   * Attempts to fetch a required emoji, returns a question mark if not found
   * @param {string} emojiName - Emoji name
   * @param {string} fallback - Replacement for the default question mark fallback emoji
   */
  getEmoji (emojiName, fallback) {
    if (typeof fallback === 'undefined') fallback = '❓'
    if (this.length === 0) return fallback
    const matchingEmoji = this.find(e => e.name && e.name.toLowerCase() === emojiName.toLowerCase())
    if (matchingEmoji) return `<:${matchingEmoji.name}:${matchingEmoji.id}>`
    else return fallback
  }
}