<template>
  <div>
    <top-header :blog-entry="blogEntry" />
    Single Article View
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { MetaInfo } from 'vue-meta'
import { pipe } from 'fp-ts/lib/pipeable'
import * as tEither from 'fp-ts/lib/TaskEither'
import { Context } from '@nuxt/vue-app'
import { task } from 'fp-ts/lib/Task'
import { emptyValue } from '../../../../assets/interface/BlogEntry'
import { isAxiosError } from '../../../../assets/util/TypeGuards'
import { exampleStore } from '@/assets/util/StoreAccessor'
import { getWithPathE } from '@/assets/service/JsonLoader'
import { toBlogEntryE, parseJsonObjectE } from '@/assets/service/JsonParser'
import TopHeader from '@/components/single-article-view/TopHeader.vue'

@Component({
  components: { TopHeader }
})
export default class SingleArticleView extends Vue {
  get exampleState() {
    return exampleStore.exmapleData
  }

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

    return {
      blogEntry
    }
  }
}
</script>

<style lang="scss" scoped></style>
