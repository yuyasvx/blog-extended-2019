export interface BlogConfig {
  readonly siteName: string
  readonly siteShortName: string
  readonly siteBaseUrl: string
  readonly baseJsonPath: string
}

export const blogConfig: BlogConfig = {
  siteName: 'Blog Extended',
  siteShortName: 'Blog Extended',
  siteBaseUrl: process.env.NODE_ENV === 'producution' ? 'https://blog.yuyasvx.me' : 'http://localhost:3000',
  baseJsonPath: '~/blog/public'
}

export const categoryDictionary = {
  development: '開発のあれこれ',
  information: 'おしらせ',
  tech: '技術系いろいろ',
  text: '雑記'
}

export const isBuilding = !!process.env.NUXT_ENV_ISBUILDING

export default {
  blogConfig,
  categoryDictionary,
  isBuilding
}
