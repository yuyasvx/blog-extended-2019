import NuxtConfiguration from '@nuxt/config'
import sass from 'sass'
import fibers from 'fibers'
import pkg from './package.json'
import publicJson from './blog/public/index.json'
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
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy'
  ],
  proxy: ['http://localhost:1313/**/*.json', 'http://localhost:1313/*.json'],
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
    routes() {
      const parsedResult: string[] = []
      const publicData = publicJson as NormalJson
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
      // TODO どうにかする
      // postsJson.data.forEach(post => {
      //   parsedResult.push(`${post.permalink}`)
      // })
      return parsedResult
    }
  }
}

export default config
