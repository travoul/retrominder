const {
  buildAttachment,
  extractActionAndAssignees,
  sendMessageToWebhook,
} = require('./lib')
const logger = require('./lib/logger')
const items = require('./data/actions.json')

async function start () {
  logger.debug('Starting Application')

  const attachments = items.map((item) => {
    const { action, assignees } = extractActionAndAssignees(item)
    return buildAttachment(action, assignees)
  })

  const message = {
    text: '*O que você fez hoje para alcançar esses objetivos?*',
    attachments,
  }

  await sendMessageToWebhook(message)
  logger.debug('Exiting Application')
}

start()
