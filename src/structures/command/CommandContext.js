module.exports = class CommandContext {
    constructor(options = {}) {
      this.client = options.client
      this.prefix = options.prefix

      this.message = options.message
      this.author = options.message.author
      this.member = options.message.member
      this.channel = options.message.channel
      this.guild = options.message.channel.guild
     
      this.t = () => { throw new Error('Invalid FixedT') } 
    }

    setFixedT (translate) {
      this.t = translate
  }
}
