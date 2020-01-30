const debug = require('debug')('telegrambotaaf')
const axios = require('axios')

module.exports = (token) => {
  const BASE_URL = `https://api.telegram.org/bot${token}`
  const SENDMESSAGE_URL = `${BASE_URL}/sendMessage`
  let listeners = []

  let sendMessage = async (chatId, text, data={}) => {
    data.chat_id = chatId
    data.text = text
    data.parse_mode='Markdown'
    data.disable_web_page_preview = true
    debug('sending message: %s', text)
    return axios.post(SENDMESSAGE_URL, data)
  }

  let onMessage = async (regex, cb) => {
    if (typeof regex === 'string') {
      regex = new RegExp(regex)
    }

    listeners.push({regex, cb})
  }

  let processUpdate = async (event) => {
    let data = JSON.parse(event.body)
    debug('new message %j', data)
    let message = data.message

    if (message && message.text) {
      let listener = listeners.find(l => {
        l.matches = l.regex.exec(message.text)

        if (l.matches) {
          l.regex.lastIndex = 0
          return true
        }
      })

      if (listener) {
        let prom = listener.cb(message, listener.matches)
        if (prom && prom.then) {
          return prom.then(() => {
            debug('promise lambda response 200')
            return {
              statusCode: 200,
              headers: {},
              body: ''
            }
          })
        }
      }

      debug('lambda response 200')
      return {
        statusCode: 200,
        headers: {},
        body: ''
      }
    }
  }

  processUpdate.on = onMessage
  processUpdate.sendMessage = sendMessage

  return processUpdate
}