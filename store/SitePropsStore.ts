import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import * as tEither from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/pipeable'
import { Term } from '@/assets/interface/SiteProps'
import { getWithPathE } from '@/assets/service/JsonLoader'
import { parseJsonObjectE } from '@/assets/service/JsonParser'

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
    await pipe(
      getWithPathE(`/`),
      tEither.chain(json => tEither.fromEither(parseJsonObjectE(json)))
    )()
    return []
  }
}
