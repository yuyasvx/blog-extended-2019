import BlogEntry from './BlogEntry'

export default interface BlogEntryNeighbor {
  older: Partial<BlogEntry> | null
  newer: Partial<BlogEntry> | null
}
