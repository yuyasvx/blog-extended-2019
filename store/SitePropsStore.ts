import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { Term } from '@/assets/interface/SiteProps'

@Module({ name: 'SitePropsStore', stateFactory: true, namespaced: true })
export default class SitePropsStore extends VuexModule {
  categories: Term[] = []

  @Mutation
  public setCategories(terms: Term[]): void {
    this.categories = terms
  }
}
