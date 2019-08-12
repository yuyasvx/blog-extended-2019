import { pipe } from 'fp-ts/lib/pipeable'
import * as o from 'fp-ts/lib/Option'

/**
 * contentにはsummaryも含まれちゃってるので、その分を消して本当にcontentだけにする
 * @param summary
 * @param content
 */
export const extractContent = (summary?: string | null, content?: string | null): string => {
  const eraseLength = summary ? summary.length : 0
  return pipe(
    o.fromNullable(content),
    o.map(content => content.substring(eraseLength)),
    o.getOrElse(() => '')
  )
}

/**
 * マスタッシュをエスケープしてエラー回避
 * @param text
 */
export const escapeMustache = (text: string): string => {
  return text
    .split('{{')
    .join('{&#8203;{')
    .split('}}')
    .join('}&#8203;}')
}

export default {
  extractContent,
  escapeMustache
}
