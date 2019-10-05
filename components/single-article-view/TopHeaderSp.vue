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
// TODO 横スライドしたときの動作を実装したいな
import { Component, Vue, Prop } from 'nuxt-property-decorator'
// import { computed, createComponent, PropType } from 'vue-function-api'

import CoverImage from './CoverImage.vue'
import BlogEntry from '@/assets/interface/BlogEntry'
import topHeaderResource from '@/assets/service/TopHeaderResource'
import { getDisplayName } from '@/assets/util/CategoryMapper'

interface TopHeaderProps {
  blogEntry: BlogEntry
}

// export default createComponent<TopHeaderProps>({
//   components: {
//     CoverImage
//   },
//   props: (['blogEntry'] as unknown) as PropType<TopHeaderProps>,
//   setup(props) {
//     const category = computed(() => getDisplayName(props.blogEntry.categories[0].name))
//     const postDate = computed(() => {
//       if (props.blogEntry.formatterDate) {
//         return props.blogEntry.formatterDate
//       }
//       return props.blogEntry.date
//     })
//     const coverStyle = computed(() => {
//       let style = {}
//       if (props.blogEntry.hasCoverImage) {
//         const imageSource = `${topHeaderResource.getThumbnailLocation(props.blogEntry.permalink, false)}`
//         style = { backgroundImage: `url(${imageSource})` }
//       }
//       return style
//     })

//     return {
//       category,
//       postDate,
//       coverStyle
//     }
//   }
// })
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
@import '../../assets/style/variables/media-query';

.top-header {
  width: 100%;
  height: 375px;
  position: relative;

  @include mq(narrowest) {
    height: 100vw;
  }

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
    border: 10px solid #fff;
    margin: 10px;
    width: calc(100vw - 20px); // どうして20pxマイナスしないとだめなのかが謎
  }

  > .frame > .description {
    height: 100%;
    padding: 30px;
    font-size: 13px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    > .title {
      padding: 0;
      text-align: center;

      h1 {
        font-weight: 800;
        font-size: 25px;
        line-height: 30px;
        letter-spacing: -1px;
        margin: 0;
        padding: 0;
      }

      > .subtitle {
        padding: 0;
        font-weight: 500;
        font-size: 15px;
        text-align: center;
        margin-top: 10px;
      }
    }
  }
}
</style>
