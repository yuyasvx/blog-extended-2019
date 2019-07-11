import { EntryInfo } from './EntryInfo'

export interface Term extends EntryInfo {
  name: string
  link: string
  count: number
}

export interface TaxonomyInfo {
  key: string
  terms: Term[]
}

export default interface SiteProps {
  taxonomies: TaxonomyInfo[]
}
