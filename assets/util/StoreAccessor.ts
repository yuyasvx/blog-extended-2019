/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import ExampleStore from '@/store/ExampleStore'
import SitePropsState from '@/store/SitePropsStore'
import SingleBlogEntryStore from '@/store/SingleBlogEntryStore'

let exampleStore: ExampleStore
let sitePropsState: SitePropsState
let singleBlogEntryStore: SingleBlogEntryStore

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function initialiseStores(store: Store<any>): void {
  exampleStore = getModule(ExampleStore, store)
  sitePropsState = getModule(SitePropsState, store)
  singleBlogEntryStore = getModule(SingleBlogEntryStore, store)
}

export { initialiseStores, exampleStore, sitePropsState, singleBlogEntryStore }
