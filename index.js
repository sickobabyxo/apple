require('dotenv/config')

const Client = require('.src/Client')

const CLIENT_OPTIONS = {
    autoreconnect: true,
    disableEveryone: true,
    defaultImageSize: 2048,
    defaultImageFormat: 'png'
}

const client = new Client(process.env.DISCORD_TOKEN, CLIENT_OPTIONS)

client.connect()