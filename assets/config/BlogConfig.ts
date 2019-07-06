export interface BlogConfig {
  siteName: string
  siteShortName: string
  siteBaseUrl: string
  baseJsonPath: string
}

export const blogConfig: BlogConfig = {
  siteName: 'Blog Extended',
  siteShortName: 'Blog Extended',
  siteBaseUrl: 'https://blog.yuyasvx.me',
  baseJsonPath: '~/blog/public'
}

export const categoryDictionary = {
  development: '開発のあれこれ',
  information: 'おしらせ',
  tech: '技術系いろいろ',
  text: '雑記'
}

export default {
  blogConfig,
  categoryDictionary
}
