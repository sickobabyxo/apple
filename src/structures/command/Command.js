const { createOptionHandler } = require('../../utils')

module.exports = class Command {
    constructor(opts, client) {
        const options = createOptionHandler('Command', opts)
        
        this.name = options.required('name')
        this.aliases = options.optional('aliases', [])
        this.group = options.optional('group', 'basic')

        this.client = client
    }

    async _run (context, args) {   
        try {
            this.run(context, args)
        } catch (err) {
            return this.error(context, args)
        }
    }


    async run () {}
}
