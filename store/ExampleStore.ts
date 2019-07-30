import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({ name: 'ExampleStore', stateFactory: true, namespaced: true })
export default class ExampleStore extends VuexModule {
  exmapleData: string | undefined = 'example'

  @Mutation
  public mutation(exampleData: string): void {
    this.exmapleData = exampleData
  }
}
