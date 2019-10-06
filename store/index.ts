import { Store } from 'vuex'
import { initialiseStores } from '~/assets/util/StoreAccessor'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initializer = (store: Store<any>): void => initialiseStores(store)
export const plugins = [initializer]
export * from '~/assets/util/StoreAccessor'
