require('dotenv/config')

const Client = require('./Client')

const CLIENT_OPTIONS = {
    autoreconnect: true,
    disableEveryone: true,
    defaultImageSize: 2048,
    defaultImageFormat: 'png'
}

const client = new Client(process.env.DISCORD_TOKEN, CLIENT_OPTIONS)

client.connect().then(c => client.console(false, 'client was initialized with success!', 'CLIENT'))
