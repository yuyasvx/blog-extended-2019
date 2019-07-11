import { Either, left, right } from 'fp-ts/lib/Either'
import Day from 'DayJs'
import BlogEntry, * as blogEntry from '../interface/BlogEntry'
import SiteProps from '../interface/SiteProps'

interface NormalJson {
  data: unknown[]
  siteprops?: SiteProps
}

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const isPartialBlogEntry = (value: any): value is Partial<BlogEntry> => {
//   const entry: BlogEntry = blogEntry.emptyValue()
//   for (const key of Object.keys(value)) {
//     if (entry[key] === undefined) {
//       return false
//     }
//     console.log(value[key])
//   }
//   return true
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toBlogEntry = (item: any): BlogEntry => {
  if (item.toString() !== '[object Object]') {
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
export const parseToBlogEntry = (json: any): Either<Error, Partial<BlogEntry>[]> => {
  if (!isNormalJson(json)) {
    left(new Error('parse failed'))
  }
  const jsonData: NormalJson = json
  const parsedBlogEntries: Partial<BlogEntry>[] = []

  try {
    jsonData.data.forEach(u => {
      parsedBlogEntries.push(u as Partial<BlogEntry>)
    })
  } catch (err) {
    return left(err)
  }
  return right(parsedBlogEntries)
}
