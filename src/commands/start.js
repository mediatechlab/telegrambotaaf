const debug = require('debug')('telegrambotaaf:help')

module.exports = (bot) => {

  async function handler(message) {
    const chatId = message.chat.id
    let response
    response = `You called /start command. This is an example message just to show that the bot is working`
    bot.sendMessage(chatId, response)
  }
  
  return {
    handler,
  }
}