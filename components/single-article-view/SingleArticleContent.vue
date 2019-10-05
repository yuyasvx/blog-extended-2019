<template>
  <component :is="{ template: value }" />
</template>
<script lang="ts">
import { computed, createComponent, PropType } from 'vue-function-api'

interface SingleArticleContentProps {
  content: string | null
}

export default createComponent<SingleArticleContentProps>({
  props: (['content'] as unknown) as PropType<SingleArticleContentProps>,
  setup(props) {
    const value = computed(() => {
      return `<section class="content">${props.content}</section>`
    })

    return {
      value
    }
  }
})
</script>
