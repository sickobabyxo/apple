const { Loader } = require('../')
const { readdirSync } = require('fs')
const i18next = require('i18next')
const translationBackend = require('i18next-node-fs-backend')

module.exports = class LocaleLoader extends Loader {
    constructor(client) {
        super({ name: 'Locales', critical: true }, client)

        this.client = client

        this.ns = ['commands', 'events', 'commons']
    }

    load () {
        try {
            this.initializeLocales()
            this.client.console(false, 'Locales loaded!', 'Loaders')
        } catch (error) {
            this.client.console(true, error.stack || error, 'Loaders')
        }
        return true
    }

    async initializeLocales() {
        i18next.use(translationBackend).init({
            ns: this.ns,
            preload: await readdirSync('./src/locales/'),
            fallbackLng: 'pt-BR',
            backend: {
                loadPath: './src/locales/{{lng}}/{{ns}}.json'
            },
            interpolation: {
                escapeValue: false
            },
            returnEmpyString: false
        })
    }
}
