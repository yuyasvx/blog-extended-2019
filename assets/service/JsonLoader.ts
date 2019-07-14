import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither'
import axios, { AxiosError } from 'axios'
import { isBuilding, blogConfig } from '../config/BlogConfig'
import NormalJson from '../interface/NormalJson'
import { isAxiosError } from '../util/TypeGuards'

/**
 * パスを指定してJSONを取得する。nuxt generateが走っているときに呼ばれると、内部のJSONファイルを探し、
 * それ以外のときはaxiosを使ってJSONファイルを取得する。
 *
 * @param path jsonのパス
 * @param filename jsonのファイル名。指定なしの場合は "index" が指定される。
 * @throws {AxiosError} json取得失敗時
 */
export const getWithPath = async (path: string, filename: string = 'index'): Promise<NormalJson> => {
  let preparedPath = path
  if (preparedPath.startsWith('/') === false) {
    preparedPath = `/${preparedPath}`
  }
  if (preparedPath.endsWith('/') === false) {
    preparedPath = `${preparedPath}/`
  }
  if (isBuilding) {
    preparedPath = decodeURIComponent(preparedPath)
    const data = await import(`${blogConfig.baseJsonPath}${preparedPath}${filename}.json`)
    return data
  } else {
    const data = await axios.get(`${blogConfig.siteBaseUrl}${preparedPath}${filename}.json`)
    return data.data
  }
}

/**
 * getWithPath の TaskEitherバージョン。
 * @see getWithPath
 * @param path jsonのパス
 * @param filename jsonのファイル名。指定なしの場合は "index" が指定される。
 */
export const getWithPathE = (path: string, filename: string = 'index'): TaskEither<Error | AxiosError, NormalJson> => {
  return tryCatch(
    () => getWithPath(path, filename),
    err => {
      if (isAxiosError(err)) {
        return err as AxiosError
      }
      return err as Error
    }
  )
}
