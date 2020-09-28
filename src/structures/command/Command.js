const { createOptionHandler } = require('../../utils')
const Embed = require('../Embed')
const CommandError = require('./CommandError')
const CommandRequirements = require('./CommandRequirements')

module.exports = class Command {
    constructor(opts, client) {
        const options = createOptionHandler('Command', opts)
        
        this.name = options.required('name')
        this.aliases = options.optional('aliases', [])
        this.group = options.optional('group', 'basic')
        this.requirements = options.optional('requirements', {})

        this.client = client
    }

    async _run (context, args) {
        try {
            this.handleRequirements(context, args)
        } catch (err) {
            return this.error(context, err)
        }

        try {
            this.run(context, args)
        } catch (err) {
            return console.log(args)
        }
    }

    handleRequirements(context, args) {
        return this.requirements ? CommandRequirements.handle(context, this.requirements, args) : true
    }
    
    error ({ t, author, channel, prefix }, error) {
        if (error instanceof CommandError) {
          const usage = this.usage(t, prefix)
          const embed = new Embed(author)
            .setDescription(`**${error.message}**\n${error.showUsage}` ? usage : '')
          return channel.createMessage({ content: `${author.username}#${author.discriminator}:`, embed })
        }
        console.error(error)
    }

    get fullName () {
        return this.parentCommand ? `${this.parentCommand.fullName} ${this.name}` : this.name
    }

    usage(t, prefix, noUsage = true) {
        const usagePath = `${this.path}.commandUsage`
        const usage = noUsage ? t(`commands:${usagePath}`) : t([`commands:${usagePath}`, ''])
  
        if (usage !== usagePath) {
          return `> **${t('commons:usage')}:** \`${prefix}${this.fullName} ${usage ? usage : ''}\``
        } else {
          return `> **${t('commons:usage')}:** \`${prefix}${this.fullName}\``
        }
    }

    async run () {}
}
