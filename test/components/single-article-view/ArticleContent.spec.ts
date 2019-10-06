import { shallowMount } from '@vue/test-utils'
import target from '@/components/single-article-view/SingleArticle.vue'
import { emptyValue } from '@/assets/interface/BlogEntry'

describe('SingleArticle', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(target, {
      propsData: {
        blogEntry: emptyValue()
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
