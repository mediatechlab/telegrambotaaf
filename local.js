require('dotenv').config()
const spawn = require('child_process').spawn
const ngrok = require('ngrok')
const axios = require('axios')

if (!('TELEGRAM_TOKEN' in process.env)) {
  console.error('TELEGRAM_TOKEN environment variable not set')
  console.error('exiting')
  process.exit(1)
}

let local = async () => {
  let port = process.env.PORT || 3000

  let config = { port: port }

  console.log('starting serverless offline')
  let sls = spawn('node_modules/.bin/sls', ['offline', '-P', port])
  sls.stdout.on('data', data => {
    console.log(`${data}`)
  })
  sls.stderr.on('data', data => console.error(`${data}`))
  sls.on('error', err => console.log(`failed to start serverless offline: ${err}`))
  sls.on('close', code => console.log(`serverless offline ended with code: ${code}`))

  console.log('starting tunnel')
  let url = ''
  try {
    url = await ngrok.connect(port)
    console.log(`tunnel configured with url: ${url}`)
  } catch(e) {
    console.log(`failed to start tunnel:`, e)
    console.error(`ABORTING`)

    if (!sls.killed) {
      sls.kill()
      process.exit(1)
    }
  }

  try { 
    await axios({
      method: 'post',
      url: `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/setWebhook`,
      data: {
        'url': `${url}`
      }
    })

    console.log('LOCAL DEVELOPMENT STARTED\nUse your bot normally')
  } catch(e) {
    console.log(`failed to start setWebhook: ${e}`)

    if (!sls.killed) {
      sls.kill()
      await ngrok.disconnect()
      await ngrok.kill()
    }
  }
}

local()
