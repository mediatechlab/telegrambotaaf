const debug = require('debug')('telegrambotaaf')
const TelegramBot = require('./src/telegram')

const TOKEN = process.env.TELEGRAM_TOKEN
const bot = TelegramBot(TOKEN)

const start = require('./src/commands/start')(bot)
const help = require('./src/commands/help')(bot)

module.exports.entry = async (event) => await bot(event)

bot.on(/\/start/, start.handler)
bot.on(/\/help/, help.handler)

bot.on('message', async (msg) => {
  //TODO
  const chatId = msg.chat.id
  debug('generic message, ignoring')
  // await bot.sendMessage(chatId, 'Received your message')
})
