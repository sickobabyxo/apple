const { Listener } = require('../')

module.exports = class WebsocketListener extends Listener {
  constructor (client) {
    super({
        events: ['ready', 'shardReady', 'shardPreReady']
    }, client)
  }

  async onReady () {
    this.client.console(false, `All the shards was initialized with sucess`, 'Ready')
    /*
    * 1 = PLAYING
    * 2 = LISTENING
    * 3 = WATCHING
    */

    const random = [
      { name: 'Netflix 📺', type: 3 },
    ]
    
    setInterval(() => {
      const status = Math.floor(Math.random() * random.length)
      this.client.editStatus('dnd', random[status])
    }, 10000)
  }

  async onShardPreReady(shardId) {
    this.client.console(false, `Initializing shard ${shardId}`, 'ShardPreReady')
  }
  
  async onShardReady(shardId) {
    this.client.console(false, `Shard ${shardId} initialized with sucess!`, 'ShardReady')
  }
}
