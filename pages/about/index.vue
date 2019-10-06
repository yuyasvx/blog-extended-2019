<template>
  <section class="container">
    This is about page.
    <span>Vuex State Example: {{ exampleState }}</span>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { exampleStore } from '@/assets/util/StoreAccessor'

@Component
export default class AboutIndex extends Vue {
  get exampleState() {
    return exampleStore.exmapleData
  }

  fetch() {
    // exampleStore.mutation('hello!')
  }
}
</script>
