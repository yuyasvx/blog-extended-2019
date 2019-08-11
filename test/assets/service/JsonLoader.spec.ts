import axios from 'axios'
import { mocked } from 'ts-jest/utils'
import * as tEither from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/pipeable'
import { task } from 'fp-ts/lib/Task'
import { getWithPath, getWithPathE } from '@/assets/service/JsonLoader'

const testJson = {
  data: [
    {
      title: 'test title 1',
      subtitle: null,
      date: '2019-03-16 00:16:03 +0900 JST',
      categories: [{ name: 'Development', link: 'development' }],
      tags: [{ name: 'Docker', link: 'docker' }, { name: '雑記', link: '%E9%9B%91%E8%A8%98' }],
      jsonlink: 'https://blog.yuyasvx.me/post/2019/03/hello-docker/index.json',
      permalink: '/post/2019/03/hello-docker/',
      hasCoverImage: false
    }
  ],
  siteprops: {
    taxonomies: []
  }
}

const configMock = {
  __esModule: true,
  isBuilding: true,
  blogConfig: {
    siteBaseUrl: '/site-base-url',
    siteName: 'site name',
    siteShortName: 'name',
    baseJsonPath: './'
  }
}

// ここでmockを設定すると、テストケースごとにmockの構成を変えることは出来ない
jest.mock('axios')

describe('getWithPath', () => {
  // Functionのmockならあとから定義できる
  mocked(axios.get).mockImplementationOnce(() =>
    Promise.resolve({
      data: testJson
    })
  )

  beforeEach(() => {
    jest.resetModules()
  })

  it('nuxt generateの時以外はaxiosを使う', async done => {
    const result = await getWithPath('test-string')

    expect(result).toBeTruthy()
    expect(result).toBe(testJson)
    done()
  })

  // it('nuxt generateの時はプロジェクト内のJSONファイルをインポートする', async done => {
  //   // jest.dontMock('@/assets/config/BlogConfig')
  //   // jest.doMock('@/assets/config/BlogConfig', () => configMock)
  //   // const result = await getWithPath('test-data')
  //   jest.doMock('@/assets/config/BlogConfig', () => configMock)

  //   // expect(result).toBe(testJson)
  //   await import('@/assets/config/BlogConfig').then(() => {
  //     expect(config.isBuilding).toBe(true)
  //     done()
  //   })
  // })
})

describe('getWithPath Either', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('nuxt generateの時以外はaxiosを使う Either', async done => {
    mocked(axios.get).mockImplementationOnce(() =>
      Promise.resolve({
        data: testJson
      })
    )

    await pipe(
      getWithPathE('test-string'),
      tEither.fold(
        err => {
          throw err
        },
        json => {
          expect(json).toBe(testJson)
          return task.of(json)
        }
      )
    )()

    done()
  })

  it('nuxt generateの時以外はaxiosを使う Either: エラーハンドリング', async done => {
    mocked(axios.get).mockImplementationOnce(() => Promise.reject(new Error('test error')))
    await pipe(
      getWithPathE('test-string'),
      tEither.fold(
        err => {
          expect(err.message).toBe('test error')
          return task.of({})
        },
        () => {
          throw new Error('test failed')
        }
      )
    )()

    done()
  })
})
