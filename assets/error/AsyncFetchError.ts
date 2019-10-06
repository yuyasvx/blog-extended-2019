import ExtensibleError from '../interface/ExtensibleError'

export default class AsyncFetchError extends ExtensibleError {
  content: unknown

  constructor(content: unknown) {
    let message: string | undefined
    const err = content as Error
    if (err.message && typeof err.message === 'string') {
      message = err.message
    }
    super(message)
    this.content = content
  }
}
