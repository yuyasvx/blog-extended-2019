import NuxtConfiguration from '@nuxt/config'
import sass from 'sass'
import fibers from 'fibers'
import { pipe } from 'fp-ts/lib/pipeable'
import * as te from 'fp-ts/lib/TaskEither'
import pkg from './package.json'
// import postsJson from './blog/public/post/index.json'
import NormalJson from './assets/interface/NormalJson'

const config: NuxtConfiguration = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['@/assets/style/global.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/function-api.js'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy'
  ],
  proxy: ['http://localhost:1313/**/*.json', 'http://localhost:1313/*.json', 'http://localhost:1313/images/**/*.*'],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        if (config.module == null) {
          return
        }
        config.devtool = 'inline-cheap-module-source-map'
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        if (config.resolve && config.resolve.alias) {
          config.resolve.alias.vue = 'vue/dist/vue.common'
        } else {
          config.resolve = { alias: { vue: 'vue/dist/vue.common' } }
        }
      }
    },
    // use dart-sass instead of node-sass
    loaders: {
      scss: {
        implementation: sass,
        fiber: fibers
      }
    }
  },
  generate: {
    dir: 'generated',
    /*
     ** nuxt generate時、動的ルーティング時のコンテンツ生成対象
     ** @see https://ja.nuxtjs.org/api/configuration-generate#routes
     */
    async routes() {
      const parsedResult: string[] = []
      await pipe(
        te.tryCatch(
          async () => {
            const publicJson: unknown = await import('./blog/public/index.json')
            return publicJson as NormalJson
          },
          err => err as Error
        ),
        te.map(publicData => {
          if (publicData.siteprops != null) {
            publicData.siteprops.taxonomies
              .filter(element => element.key === 'categories')[0]
              .terms.forEach(term => {
                parsedResult.push(`/categories/${term.link}/`)
              })

            publicData.siteprops.taxonomies
              .filter(element => element.key === 'tags')[0]
              .terms.forEach(term => {
                parsedResult.push(`/tags/${decodeURIComponent(term.link)}/`)
              })
          }
          return publicData
        })
      )()

      return parsedResult
    }
  }
}

export default config
