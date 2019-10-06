<template>
  <div class="top-header">
    <cover-image :style="coverStyle" />
    <div class="box">
      <div class="frame">
        <div class="description">
          <div class="category">
            {{ category }}
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
import { Component, Vue, Prop } from 'nuxt-property-decorator'
// import { computed, createComponent, PropType, onMounted, onCreated, onBeforeDestroy } from 'vue-function-api'
import CoverImage from './CoverImage.vue'
import BlogEntry from '@/assets/interface/BlogEntry'
import topHeaderResource from '@/assets/service/TopHeaderResource'
import { getDisplayName } from '@/assets/util/CategoryMapper'

interface TopHeaderProps {
  blogEntry: BlogEntry
}

@Component({
  components: { CoverImage }
})
export default class TopHeaderSp extends Vue {
  @Prop({
    required: true
  })
  readonly blogEntry!: BlogEntry

  get category() {
    return getDisplayName(this.blogEntry.categories[0].name)
  }

  get postDate() {
    if (this.blogEntry.formatterDate) {
      return this.blogEntry.formatterDate
    }
    return this.blogEntry.date
  }

  get coverStyle() {
    let style = {}
    if (this.blogEntry.hasCoverImage) {
      const imageSource = `${topHeaderResource.getThumbnailLocation(this.blogEntry.permalink, false)}`
      style = { backgroundImage: `url(${imageSource})` }
    }
    return style
  }
}
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
  font-feature-settings: 'palt';

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
