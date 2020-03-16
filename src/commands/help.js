const debug = require('debug')('telegrambotaaf:help')

module.exports = async function* handler() {
    yield `
*Telegram Bot as a Function - Help*
This is just the template of telegram bot running on AWS Lambda functions. You don't need to spin up a server to get your bot running. This uses the [serverless](https://serverless.com) framework to deploy the code automatically and \`serverless-offline\` to develop locally. It also uses \`ngrok\` to create a local tunnel to comunicate directly with Telegram

Please replace this message with your bot description and its commands.

*Commands*
/start just a placeholder message as a command example
`
}
