<template>
  <div class="cover-image"></div>
</template>

<script lang="ts">
import { createComponent } from 'vue-function-api'
export default createComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.cover-image {
  background-position: center, center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
