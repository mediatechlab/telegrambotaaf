const debug = require('debug')('telegrambotaaf:help')

module.exports = (bot) => {

  async function handler(message) {
    const chatId = message.chat.id
    let response
    response = `
*Telegram Bot as a Function - Help*
This is just the template of a bot project to create a telegram bot using AWS Lambda functions to run it. You don't need to spin up a server to get your bot running. This uses the [serverless](https://serverless.com) framework to deploy the code automatically and \`serverless-offline\` to develop locally. It also uses \`ngrok\` to create a local tunnel to comunicate directly with Telegram

*Commands*
/start just a placeholder message as a command example
`
    bot.sendMessage(chatId, response)
  }
  
  return {
    handler,
  }
}