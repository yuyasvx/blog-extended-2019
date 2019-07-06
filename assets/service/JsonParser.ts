import { Either, left, right } from 'fp-ts/lib/Either'
import Day from 'DayJs'
import BlogEntry, * as blogEntry from '../interface/BlogEntry'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseToBlogEntry = (json: any, partial: boolean = false): Either<Error, BlogEntry> => {
  if (json.toString() !== '[object Object]') {
    return left(new Error('オブジェクトではない'))
  }
  const entry: BlogEntry = blogEntry.emptyValue()
  if (partial === false) {
    for (const key of Object.keys(entry)) {
      if (json[key] === undefined) {
        return left(new Error('parse failed'))
      }
    }
  }
  entry.title = json.title
  entry.subtitle = json.subtitle
  entry.date = Day(json.date)
  entry.categories = json.categories
  entry.tags = json.tags
  entry.summary = json.summary
  entry.content = json.content
  entry.permalink = json.permalink
  entry.jsonlink = json.jsonlink
  entry.hasCoverImage = json.hasCoverImage
  entry.neighbor = json.neighbor

  if (!entry.date.isValid) {
    return left(new Error(`invalid date: ${json.date}`))
  }
  return right(entry)
}
