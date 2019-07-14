import { Either, tryCatch as tryCatchE } from 'fp-ts/lib/Either'
import Day from 'dayjs'
import BlogEntry, * as blogEntry from '../interface/BlogEntry'
import NormalJson from '../interface/NormalJson'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNormalJson = (jsonLike: any): jsonLike is NormalJson => {
  if (jsonLike.data === undefined) {
    return false
  }
  if (Object.keys(jsonLike).length > 2) {
    return false
  }
  // TODO sitepropsの判定が甘々
  return true
}

/**
 * 欠落のある場合は空値で無理やり補完してBlogEntryを作成する
 * @param item
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toBlogEntry = (item: any): BlogEntry => {
  const toString = Object.prototype.toString
  if (toString.call(item) !== '[object Object]') {
    throw new Error('オブジェクトではない')
  }
  const unsafeItem = item as BlogEntry
  const entry: BlogEntry = blogEntry.emptyValue()
  const itemDate = item.date as string

  entry.title = unsafeItem.title !== undefined ? unsafeItem.title : entry.title
  entry.subtitle = unsafeItem.subtitle !== undefined ? unsafeItem.subtitle : entry.subtitle
  entry.date = Day(itemDate.replace('JST', '').trim(), 'YYYY-MM-DD HH:mm:ss ZZ')
  entry.categories = unsafeItem.categories !== undefined ? unsafeItem.categories : entry.categories
  entry.tags = unsafeItem.tags !== undefined ? unsafeItem.tags : entry.tags
  entry.summary = unsafeItem.summary !== undefined ? unsafeItem.summary : entry.summary
  entry.content = unsafeItem.content !== undefined ? unsafeItem.content : entry.content
  entry.permalink = unsafeItem.permalink !== undefined ? unsafeItem.permalink : entry.permalink
  entry.jsonlink = unsafeItem.jsonlink !== undefined ? unsafeItem.jsonlink : entry.jsonlink
  entry.hasCoverImage = unsafeItem.hasCoverImage !== undefined ? unsafeItem.hasCoverImage : entry.hasCoverImage
  entry.neighbor = unsafeItem.neighbor !== undefined ? unsafeItem.neighbor : entry.neighbor

  if (!entry.date.isValid()) {
    throw new Error(`invalid date: ${item.date}`)
  }
  return entry
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toBlogEntryE = (item: any): Either<Error, BlogEntry> => {
  return tryCatchE(() => toBlogEntry(item), err => err as Error)
}

/**
 * 型チェックの無いjsonファイルを解析してBlogEntry型にする。
 * 一部しかデータがない場合（本文等の項目が存在しない）でも特に何もしない
 * @param json 読み込んだJSONオブジェクト
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseJsonObject = (json: any): Partial<BlogEntry>[] => {
  if (!isNormalJson(json)) {
    throw new Error('parse failed')
  }
  const jsonData: NormalJson = json
  let parsedBlogEntries: Partial<BlogEntry>[] = []

  const toString = Object.prototype.toString
  if (toString.call(json.data) === '[object Array]') {
    parsedBlogEntries = jsonData.data.map(u => u as Partial<BlogEntry>)
    // TODO dateだけ型がstringのままになっている
  } else {
    parsedBlogEntries.push(jsonData.data as Partial<BlogEntry>)
  }
  return parsedBlogEntries
}

/**
 * parseJsonObjectのEither版
 * @see parseJsonObject
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseJsonObjectE = (json: any): Either<Error, Partial<BlogEntry>[]> => {
  return tryCatchE(() => parseJsonObject(json), err => err as Error)
}
