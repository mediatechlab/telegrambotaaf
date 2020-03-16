const debug = require('debug')('telegrambotaaf:start')

module.exports = async function* handler(message) {
  debug(`message from user id ${message.from.id}`)

  yield `You called /start command. This is an example message just to show that the bot is working`
}
