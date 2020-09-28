const CommandStructures = require('./structures/command')

module.exports = {
    Embed : require('./structures/Embed'),
    Loader: require('./structures/Loader'),
    Listener: require('./structures/Listener'),
      
    // Commands Structures
    Command: CommandStructures.Command,
    CommandError: CommandStructures.CommandError,
    CommandContext: CommandStructures.CommandContext,
    CommandRequirements: CommandStructures.CommandRequirements,
}