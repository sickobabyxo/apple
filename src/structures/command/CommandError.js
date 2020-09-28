module.exports = class CommandError extends Error {
  constructor (message, showUsage = false, description) {
    super(message)
    this.showUsage = showUsage
    this.description = description
  }
}