const {
  buildAttachment,
  extractActionAndAssignees,
} = require('../../lib')

describe('Index', () => {
  describe('#buildAttachment', () => {
    test('should return an object with correct properties', () => {
      const attachment = buildAttachment('action', 'assignees')

      expect(attachment).toEqual(expect.objectContaining({
        text: expect.any(String),
        mrkdwn_in: expect.arrayContaining(['text']),
      }))
    })

    test('should throw when called with falsy action', () => {
      const fn = () => buildAttachment(null, 'assignees')
      expect(fn).toThrow(TypeError)
    })

    test('should throw when called with falsy assignees', () => {
      const fn = () => buildAttachment('action', null)
      expect(fn).toThrow(TypeError)
    })

    test('should throw when called with falsy action and assginees', () => {
      const fn = () => buildAttachment(null, null)
      expect(fn).toThrow(TypeError)
    })
  })

  describe('#extractActionAndAssignees', () => {
    test('should return action and assignees', () => {
      const text = 'action: actual text for action\nassignees: people and teams'
      const { action, assignees } = extractActionAndAssignees(text)

      expect(action).toBe('actual text for action')
      expect(assignees).toBe('people and teams')
    })

    test('should return assignees only', () => {
      const text = 'actions: actual text for action\nassignees: people and teams'
      const { action, assignees } = extractActionAndAssignees(text)

      expect(action).toBe('')
      expect(assignees).toBe('people and teams')
    })

    test('should return action only', () => {
      const text = 'action: actual text for action\nassignee: people and teams'
      const { action, assignees } = extractActionAndAssignees(text)

      expect(action).toBe('actual text for action')
      expect(assignees).toBe('')
    })

    test('should return empty string for action and assignees', () => {
      const text = 'actions: actual text for action\nassignee: people and teams'
      const { action, assignees } = extractActionAndAssignees(text)

      expect(action).toBe('')
      expect(assignees).toBe('')
    })
  })
})
