const debug = require('debug')('telegrambotaaf:bot')
const axios = require('axios')

module.exports = (token) => {
  const BASE_URL = `https://api.telegram.org/bot${token}`
  const SENDMESSAGE_URL = `${BASE_URL}/sendMessage`
  const UPDATEMESSAGE_URL = `${BASE_URL}/editMessageText`
  let listeners = []
  listeners.onmemberjoin = listeners.onmemberleave = () => {}

  let sendMessage = async (chatId, text, data={}) => {
    data.chat_id = chatId
    data.text = text
    data.parse_mode='Markdown'
    data.disable_web_page_preview = true
    debug('sending message', text)
    return axios.post(data.message_id ? UPDATEMESSAGE_URL : SENDMESSAGE_URL, data)
  }

  async function onMessage (regex, cb) {
    if (typeof regex === 'string') {
      regex = new RegExp(regex)
    }

    listeners.push({regex, cb})
  }

  async function onMemberJoin (cb) {
    listeners.onmemberjoin = cb
  }

  async function onMemberLeave (cb) {
    listeners.onmemberleave = cb
  }

  async function processUpdate (event) {
    debug('processUpdate', typeof event.body)
    let data = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    debug('new message', data)
    let updateId = data.update_id
    let message = data.message
    let messageId = message.message_id
    let chatId = message.chat.id

    if (message.new_chat_members) {
      response = await listeners.onmemberjoin(message)
    } else if (message.left_chat_member) {
      response = await listeners.onmemberleave(message)
    } else if (message.text) {
      let listener = listeners.find(l => {
        l.matches = l.regex.exec(message.text)

        if (l.matches) {
          l.regex.lastIndex = 0
          l.matches = l.matches.slice(1)
          return true
        }
      })

      if (listener) {
        try {
          debug(`listener found executing command update_id[${updateId}] message_id[${messageId}]`)
          for await (let response of listener.cb(message, listener.matches.groups || listener.matches, listener.matches)) {
            debug('dentro do for await', response)
            if (response) {
              debug(`sending message  update_id[${updateId}] message_id[${messageId}]`)
              await sendMessage(chatId, response)
              debug(`message sent update_id[${updateId}] message_id[${messageId}]=>${response}`)
            }
          }
          debug(`ended command success update_id[${updateId}] message_id[${messageId}]`)
        } catch(e) {
          debug(`UNEXPECTED ERROR DURING command exec`, e)
        }
      }
    }

    debug('lambda response 200')
    return {
      statusCode: 200,
      headers: {},
      body: ''
    }
  }

  processUpdate.on = onMessage
  processUpdate.onMemberJoin = onMemberJoin
  processUpdate.onMemberLeave = onMemberLeave
  processUpdate.sendMessage = sendMessage

  return processUpdate
}
