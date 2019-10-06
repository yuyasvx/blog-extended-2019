<template>
  <div class="single-article">
    <single-article-summary :content="blogEntry.summary" />
    <single-article-content :content="blogEntry.content" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BlogEntry from '@/assets/interface/BlogEntry'
import SingleArticleSummary from '@/components/single-article-view/SingleArticleSummary.vue'
import SingleArticleContent from '@/components/single-article-view/SingleArticleContent.vue'

@Component({
  components: {
    SingleArticleSummary,
    SingleArticleContent
  }
})
export default class SingleArticle extends Vue {
  @Prop(Object)
  readonly blogEntry!: BlogEntry
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/variables/layout';
@import '../../assets/style/variables/media-query';

.single-article {
  width: 1200px;
  margin: ($length-unit * 2) auto 0 auto;

  @include mq-range(narrowest, narrower) {
    width: 100%;
    margin: ($length-unit) auto 0 auto;
  }

  > .summary {
    width: 900px;
    margin: 0 auto 0 auto;

    @include mq-range(narrowest, narrower) {
      width: 100%;
      margin: 0;
    }

    &::after {
      content: '';
      display: block;
      width: ($length-unit * 2);
      height: 2px;
      background: #0f0f0f;
      margin: ($length-unit * 2) 0 ($length-unit * 2) 0;

      @include mq-range(narrowest, narrower) {
        width: ($length-unit);
        margin: ($length-unit) 0 ($length-unit) 0;
      }
    }
  }
}
</style>

<style lang="scss">
@import '../../assets/style/variables/layout';
@import '../../assets/style/variables/font';
@import '../../assets/style/variables/media-query';

.single-article > .summary {
  p {
    line-height: 1.9;
    font-weight: 500;
    font-family: $font-aricle-text;
    margin: 0;
    padding: 0;
  }
}

.single-article > .content {
  > * {
    width: 900px;
    margin: 0 auto $length-unit auto;

    @include mq-range(narrowest, narrower) {
      width: 100%;
      margin: 0 auto $length-unit auto;
    }

    @include mq-range(zero, zero) {
      padding-left: $length-unit / 4;
      padding-right: $length-unit / 4;
    }

    @include mq-range(narrowest, narrower) {
      padding-left: $length-unit / 2;
      padding-right: $length-unit / 2;
    }
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

      @include mq-range(narrowest, narrower) {
        width: 20px;
      }
    }
    line-height: 1.2;
    font-size: 30px;
    font-weight: 700;
    margin-top: ($length-unit * 2);
    margin-bottom: ($length-unit);
    position: relative;
    padding: 0 0 0 ($length-unit * 2);

    @include mq-range(narrowest, narrower) {
      font-size: 25px;
      margin-top: ($length-unit);
      margin-bottom: ($length-unit);
      padding: 0 0 0 ($length-unit);
    }
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
