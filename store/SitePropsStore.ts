import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Maybe, Nothing } from 'purify-ts/Maybe'
import { Term } from '@/assets/interface/SiteProps'
import { getWithPathE } from '@/assets/service/JsonLoader'

@Module({ name: 'SitePropsStore', stateFactory: true, namespaced: true })
export default class SitePropsStore extends VuexModule {
  categories: Term[] = []

  @Mutation
  public setCategories(terms: Term[]): void {
    this.categories = terms
  }

  @Action({ commit: 'setCategories' })
  async refresh(): Promise<Term[]> {
    // TODO 書き途中だ
    const sitePropOrError = await getWithPathE(`/`).run()
    return sitePropOrError
      .map(json => Maybe.fromNullable(json.siteprops))
      .orDefault(Nothing)
      .map(props => {
        return Maybe.fromNullable(props.taxonomies.find(t => t.key === 'category'))
          .map(tx => tx.terms)
          .orDefault([])
      })
      .orDefault([])
  }
}
