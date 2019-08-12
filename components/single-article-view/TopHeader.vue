<template>
  <div class="top-header">
    <cover-image :style="coverStyle" />
    <div class="box">
      <div class="frame">
        <div class="description">
          <div class="category">
            {{ category.name }}
          </div>
          <div class="title">
            <h1>{{ blogEntry.title }}</h1>
            <div v-if="blogEntry.subtitle != null" class="subtitle">{{ blogEntry.subtitle }}</div>
          </div>
          <div class="post-date">{{ postDate }}更新</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, createComponent, PropType } from 'vue-function-api'
import CoverImage from './CoverImage.vue'
import BlogEntry from '@/assets/interface/BlogEntry'
import topHeaderResource from '@/assets/service/TopHeaderResource'

interface TopHeaderProps {
  blogEntry: BlogEntry
}

export default createComponent<TopHeaderProps>({
  components: {
    CoverImage
  },
  props: (['blogEntry'] as unknown) as PropType<TopHeaderProps>,
  setup(props) {
    const category = computed(() => props.blogEntry.categories[0])
    const postDate = computed(() => {
      if (props.blogEntry.formatterDate) {
        return props.blogEntry.formatterDate
      }
      return props.blogEntry.date
    })
    const coverStyle = computed(() => {
      let style = {}
      if (props.blogEntry.hasCoverImage) {
        const imageSource = `${topHeaderResource.getThumbnailLocation(props.blogEntry.permalink, false)}`
        style = { backgroundImage: `url(${imageSource})` }
      }
      return style
    })

    return {
      category,
      postDate,
      coverStyle
    }
  }
})
</script>

<style lang="scss" scoped>
.top-header {
  width: 100%;
  height: 640px; // TODO レスポンシブ
  position: relative;

  > .cover-image {
    width: 100%;
    height: 100%;
  }
}

.top-header > .box {
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-weight: 500;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;

  > .frame {
    border: 20px solid #fff;
    margin: 20px;
    width: 100%;
  }

  > .frame > .description {
    height: 100%;
    padding: 40px;
    font-size: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    > .title {
      width: 960px;
      padding: 0;
      text-align: center;

      h1 {
        font-weight: 800;
        font-size: 64px;
        line-height: 80px;
        letter-spacing: -2px;
        margin: 0;
        padding: 0;
      }

      > .subtitle {
        width: 960px;
        padding: 0;
        font-weight: 500;
        font-size: 20px;
        text-align: center;
        margin-top: 20px;
      }
    }
  }
}
</style>
