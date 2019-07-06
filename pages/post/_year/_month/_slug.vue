<template>
  <div>
    Single Article View
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { MetaInfo } from 'vue-meta'
import exampleStore from '@/store/ExampleStore'

@Component
export default class SingleArticleView extends Vue {
  get exampleState() {
    return exampleStore.exmapleData
  }

  head(): MetaInfo {
    return {
      title: 'Single Article View!'
    }
  }
}
</script>

<style lang="scss" scoped></style>
