<template>
  <div class="article-content">
    <component :is="{ template: summary }" />
    <component :is="{ template: content }" />
  </div>
</template>

<script lang="ts">
import { computed, createComponent, PropType } from 'vue-function-api'
import BlogEntry from '@/assets/interface/BlogEntry'

interface ArticleContentProps {
  blogEntry: BlogEntry
}

export default createComponent<ArticleContentProps>({
  props: (['blogEntry'] as unknown) as PropType<ArticleContentProps>,
  setup(props) {
    // const exampleState = computed(() => exampleStore.exmapleData)
    const summary = computed(() => {
      return `<section class="summary">${props.blogEntry.summary}</section>`
    })
    const content = computed(() => {
      return `<section class="content">${props.blogEntry.content}</section>`
    })

    return {
      summary,
      content
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../assets/style/variables/layout';

.article-content {
  width: 1200px;
  margin: ($length-unit * 2) auto 0 auto;

  > .summary {
    width: 900px;
    margin: 0 auto 0 auto;

    &::after {
      content: '';
      display: block;
      width: ($length-unit * 2);
      height: 2px;
      background: #0f0f0f;
      margin: ($length-unit * 2) 0 ($length-unit * 2) 0;
    }
  }
}
</style>

<style lang="scss">
@import '../../assets/style/variables/layout';
@import '../../assets/style/variables/font';

.article-content > .summary {
  p {
    line-height: 1.9;
    font-weight: 500;
    font-family: $font-aricle-text;
    margin: 0;
    padding: 0;
  }
}

.article-content > .content {
  > * {
    width: 900px;
    margin: 0 auto $length-unit auto;
  }

  > p {
    line-height: 1.9;
    font-weight: 400;
    font-family: $font-aricle-text;
    margin: 0 auto ($length-unit / 2) auto;
  }

  h2 {
    &:before {
      content: '';
      display: block;
      background: #0f0f0f;
      width: 40px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    line-height: 1.2;
    font-size: 30px;
    font-weight: 700;
    margin-top: ($length-unit * 2);
    margin-bottom: ($length-unit);
    position: relative;
    padding: 0 0 0 ($length-unit * 2);
  }

  h3 {
    line-height: 1.2;
    font-size: 25px;
    font-weight: 500;
    margin-top: ($length-unit);
  }

  pre,
  code {
    font-family: $font-code;
  }

  figure {
    width: 100%;
    margin-top: ($length-unit);
    img {
      // background: #ddd;
      width: 100%;
      height: auto;
    }

    figcaption {
      p {
        font-size: 12px;
        font-family: map-get($default-set, font-family);
        margin: 0;
        padding: 5px 0 0 0;
        text-align: center;
      }
    }
  }

  figure.size-medium {
    width: 900px;

    figcaption {
      p {
        font-size: 12px;
        font-family: map-get($default-set, font-family);
        margin: 0;
        padding: 5px 0 0 0;
        text-align: center;
      }
    }
  }
}
</style>
