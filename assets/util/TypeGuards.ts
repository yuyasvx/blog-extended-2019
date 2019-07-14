import { AxiosError } from 'axios'

export const isAxiosError = (err: unknown): err is AxiosError => {
  const err_ = err as AxiosError
  if (err_.isAxiosError != null) {
    return true
  }
  return false
}

export default {
  isAxiosError
}
