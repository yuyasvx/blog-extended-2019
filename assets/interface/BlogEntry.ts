import Day from 'dayjs'
import { CategoryInfo, TagInfo } from './EntryInfo'
import BlogEntryNeighbor from './BlogEntryNeighbor'

export default interface BlogEntry {
  title: string
  subtitle: string | null
  date: Day.Dayjs
  formatterDate?: string
  categories: CategoryInfo[]
  tags: TagInfo[]
  summary: string | null
  content: string | null
  permalink: string
  jsonlink: string
  hasCoverImage: boolean
  neighbor: BlogEntryNeighbor
}

export const emptyValue = (): BlogEntry => ({
  title: '',
  subtitle: null,
  date: Day(),
  categories: [],
  tags: [],
  summary: null,
  content: null,
  permalink: '',
  jsonlink: '',
  hasCoverImage: false,
  neighbor: {
    newer: null,
    older: null
  }
})
