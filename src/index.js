const CommandStructures = require('./structures/command')

module.exports = {
    
    Loader: require('./structures/Loader'),
    Listener: require('./structures/Listener'),
      
    // Commands Structures
    Command: CommandStructures.Command,
    CommandContext: CommandStructures.CommandContext,
}