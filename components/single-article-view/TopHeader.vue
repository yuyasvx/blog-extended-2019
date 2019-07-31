<template>
  <div>
    Header.
    {{ blogEntry.title }}
    {{ blogEntry.subtitle }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import BlogEntry from '@/assets/interface/BlogEntry'

@Component
export default class TopHeader extends Vue {
  @Prop({ required: true })
  blogEntry!: BlogEntry
}
</script>

<style lang="scss" scoped></style>
