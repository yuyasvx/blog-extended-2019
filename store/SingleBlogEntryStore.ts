import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import BlogEntry, { emptyValue } from '@/assets/interface/BlogEntry'

@Module({ name: 'SingleBlogEntryStore', stateFactory: true, namespaced: true })
export default class SingleBlogEntryStore extends VuexModule {
  entry: BlogEntry = emptyValue()

  get content(): string | null {
    return this.entry.content
  }

  @Mutation
  public set(entry: BlogEntry): void {
    this.entry = entry
  }
}
