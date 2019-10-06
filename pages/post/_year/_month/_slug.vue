<template>
  <div class="single-article-view">
    <mq-layout mq="narrow+">
      <top-header :blog-entry="blogEntry" />
    </mq-layout>
    <mq-layout :mq="['narrower', 'narrowest']">
      <top-header-sp :blog-entry="blogEntry" />
    </mq-layout>
    <single-article :blog-entry="blogEntry" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/vue-app'
import { MetaInfo } from 'vue-meta'

// import { pipe } from 'fp-ts/lib/pipeable'
// import * as tEither from 'fp-ts/lib/TaskEither'
// import * as o from 'fp-ts/lib/Option'
// import { task } from 'fp-ts/lib/Task'

import { Maybe } from 'purify-ts/Maybe'
import BlogEntry, { emptyValue } from '@/assets/interface/BlogEntry'
import { isAxiosError } from '@/assets/util/TypeGuards'
import { getWithPathE } from '@/assets/service/JsonLoader'
import { parseJsonObject, toBlogEntry } from '@/assets/service/JsonParser'
import { extractContent, escapeMustache } from '@/assets/util/EntryProcessor'

import TopHeader from '@/components/single-article-view/TopHeader.vue'
import TopHeaderSp from '@/components/single-article-view/TopHeaderSp.vue'
import SingleArticle from '@/components/single-article-view/SingleArticle.vue'

@Component({
  components: {
    TopHeader,
    TopHeaderSp,
    SingleArticle
  }
})
export default class SingleArticleView extends Vue {
  blogEntry!: BlogEntry

  head(): MetaInfo {
    return {
      title: 'Single Article View!'
    }
  }

  async asyncData({ params, error }: Context) {
    const blogEntryOrError = await getWithPathE(`/post/${params.year}/${params.month}/${params.slug}`).run()
    const blogEntry = blogEntryOrError
      .map(json => parseJsonObject(json))
      .map(entries => toBlogEntry(entries[0]))
      .caseOf({
        Left: err => {
          if (isAxiosError(err)) {
            const statusCode = err.response ? err.response.status : 500
            const message = err.response ? err.response.statusText : 'Internal Error'
            error({ statusCode, message })
            return emptyValue()
          }
          throw err
        },
        Right: r => r
      })
    blogEntry.content = Maybe.fromNullable(blogEntry.content)
      .map(content => extractContent(blogEntry.summary, content))
      .map(content => escapeMustache(content))
      .orDefault('')

    return {
      blogEntry
    }
  }
}
</script>

<style lang="scss" scoped></style>
