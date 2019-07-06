import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'
import store from '../assets/store'

@Module({ namespaced: true, name: 'ExampleStore', dynamic: true, store, stateFactory: true })
export class ExampleStore extends VuexModule {
  exmapleData: string | undefined = 'example'

  @Mutation
  public mutation(exampleData: string): void {
    this.exmapleData = exampleData
  }
}

const exampleStore = getModule(ExampleStore)
export default exampleStore
