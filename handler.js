const debug = require('debug')('telegrambotaaf')
const TelegramBot = require('./src/telegram')

const TOKEN = process.env.TELEGRAM_TOKEN
const bot = TelegramBot(TOKEN)

const start = require('./src/commands/start')
const help = require('./src/commands/help')

module.exports.entry = async (event) => await bot(event)

bot.on(/\/start/, start)
bot.on(/\/help/, help)

bot.on('message', async function* (msg) {
  //TODO
  const chatId = msg.chat.id
  debug('generic message, ignoring')
  // await bot.sendMessage(chatId, 'Received your message')
})
