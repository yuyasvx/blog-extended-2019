import { configure } from '@storybook/vue'

import Vue from 'vue'
//後々vuexもを使うことも考えて。。。
import Vuex from 'vuex'
Vue.use(Vuex)

const loadStories = () => {
  require('../stories/index')
}

configure(loadStories, module)
