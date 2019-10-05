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

import { pipe } from 'fp-ts/lib/pipeable'
import * as tEither from 'fp-ts/lib/TaskEither'
import * as o from 'fp-ts/lib/Option'
import { task } from 'fp-ts/lib/Task'

import BlogEntry, { emptyValue } from '@/assets/interface/BlogEntry'
import { isAxiosError } from '@/assets/util/TypeGuards'
import { getWithPathE } from '@/assets/service/JsonLoader'
import { toBlogEntryE, parseJsonObjectE } from '@/assets/service/JsonParser'
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
    const blogEntry = await pipe(
      getWithPathE(`/post/${params.year}/${params.month}/${params.slug}`),
      tEither.chain(json => tEither.fromEither(parseJsonObjectE(json))),
      tEither.chain(entries => tEither.fromEither(toBlogEntryE(entries[0]))),
      tEither.getOrElse(err => {
        if (isAxiosError(err)) {
          const statusCode = err.response ? err.response.status : 500
          const message = err.response ? err.response.statusText : 'Internal Error'
          error({ statusCode, message })
          return task.of(emptyValue())
        }
        throw err
      })
    )()
    blogEntry.content = pipe(
      o.fromNullable(blogEntry.content),
      o.map(content => extractContent(blogEntry.summary, content)),
      o.map(content => escapeMustache(content)),
      o.getOrElse(() => blogEntry.content)
    )
    return {
      blogEntry
    }
  }
}
</script>

<style lang="scss" scoped></style>
