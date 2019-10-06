import EmptyProcessor from '@/assets/util/EntryProcessor'

describe('extractContent', () => {
  it('正常', () => {
    const rawContent = '<p>Lorem ipsum.</p><p>Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>'
    const summary = '<p>Lorem ipsum.</p>'

    const result = EmptyProcessor.extractContent(summary, rawContent)
    expect(result).toBe('<p>Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>')
  })

  it('summaryがFalsy', () => {
    const rawContent = '<p>Lorem ipsum.</p><p>Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>'
    const summary = null

    const result = EmptyProcessor.extractContent(summary, rawContent)
    expect(result).toBe(rawContent)
  })

  it('contentがFalsy', () => {
    const rawContent = null
    const summary = null

    const result = EmptyProcessor.extractContent(summary, rawContent)
    expect(result).toBe('')
  })
})

describe('escapeMustache', () => {
  it('正常', () => {
    const content = '{{ foo bar }}'

    const result = EmptyProcessor.escapeMustache(content)
    expect(result).toBe('{&#8203;{ foo bar }&#8203;}')
  })

  it('{}だけ', () => {
    const content = '{ foo bar }'

    const result = EmptyProcessor.escapeMustache(content)
    expect(result).toBe(content)
  })

  it('なにもな', () => {
    const content = 'foo bar'

    const result = EmptyProcessor.escapeMustache(content)
    expect(result).toBe(content)
  })
})
