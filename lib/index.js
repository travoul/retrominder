const { IncomingWebhook } = require('@slack/webhook')
const {
  applySpec,
} = require('ramda')

const url = process.env.SLACK_WEBHOOK_URL

if (!url) {
  throw new Error('Cant start without environment SLACK_WEBHOOK_URL')
}

const webhook = new IncomingWebhook(url)

function buildAttachment (action, assignees) {
  return {
    text: `*Ação:* ${action}\n*Responsável:* ${assignees}`,
    mrkdwn_in: ['text'],
  }
}

const extractValue = regexp => (message) => {
  const match = message.match(regexp)

  if (!match) {
    return ''
  }

  const [, captureGroup] = match

  return captureGroup
}

const extractActionAndAssignees = applySpec({
  action: extractValue(/action:\s{0,1}(.*)/),
  assignees: extractValue(/assignees:\s{0,1}(.*)/),
})

async function sendMessageToWebhook (message) {
  return webhook.send(message)
}

module.exports = {
  buildAttachment,
  extractActionAndAssignees,
  sendMessageToWebhook,
}
