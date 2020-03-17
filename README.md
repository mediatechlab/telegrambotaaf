# Telegram Bot as a Function

Project template to easily create a Telegram bot as an AWS Lambda function.

The template uses serverless-offline and ngrok to make the development easy before you deploy it to AWS.

## Configuring Telegram BOT

You need to contact the [Telegram @BotFather](https://telegram.me/botfather) to create your bot and get the token to use as an ENV here.

## Developing

You can use a `.env` or

```sh
TELEGRAM_TOKEN=telegram_bot_token npm run dev
```

This will start the `serverless-offline` and `ngrok` at the same port configured on `PORT||3000` env.
After the server is up, you can send messagens directly through telegram to your local machine.

### Env vars:

#### Required:
 - `TELEGRAM_TOKEN` token from the [@BotFather](https://telegram.me/botfather)
 - `DEBUG` comma separated namespaces to activate [debug](https://github.com/visionmedia/debug) log

#### Optional:
 - `PORT||3000` ngrok tunnel and serverless-offline port

## Deploy

The deployment is already configured to use GitlabCI. If you don't use it, you can deploy using the serverless framework from your local machine.

Configure the `required` environment variables above and the following:

- `AWS_ACCESS_KEY_ID` your AWS service user Access Key Id
- `AWS_SECRET_ACCESS_KEY` your AWS service user Secret Access Key

### GitlabCI

```sh
git push origin master
```

### Local machine

One time configuration:
```sh
npm run config
```

Every deploy:
```sh
npm run deploy
```


