import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import ExampleStore from '../../store/ExampleStore'

// eslint-disable-next-line import/no-mutable-exports
let exampleStore: ExampleStore

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function initialiseStores(store: Store<any>): void {
  exampleStore = getModule(ExampleStore, store)
}

export { initialiseStores, exampleStore }
