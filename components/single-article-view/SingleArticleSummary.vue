<template>
  <component :is="{ template: value }" />
</template>
<script lang="ts">
import { computed, createComponent, PropType } from 'vue-function-api'

interface SingleArticleSummaryProps {
  content: string | null
}

export default createComponent<SingleArticleSummaryProps>({
  props: (['content'] as unknown) as PropType<SingleArticleSummaryProps>,
  setup(props) {
    const value = computed(() => {
      return `<section class="summary">${props.content}</section>`
    })

    return {
      value
    }
  }
})
</script>
