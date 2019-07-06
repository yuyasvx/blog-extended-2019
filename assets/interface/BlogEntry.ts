import Day, { Dayjs } from 'DayJs'
import { CategoryInfo, TagInfo } from './EntryInfo'

interface BlogEntryNeighbor {
  older: BlogEntry | null
  newer: BlogEntry | null
}

export default interface BlogEntry {
  title: string
  subtitle: string | null
  date: Dayjs
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
  summary: '',
  content: '',
  permalink: '',
  jsonlink: '',
  hasCoverImage: false,
  neighbor: {
    newer: null,
    older: null
  }
})
