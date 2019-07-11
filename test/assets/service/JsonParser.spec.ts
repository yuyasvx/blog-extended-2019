import { pipe } from 'fp-ts/lib/pipeable'
import * as either from 'fp-ts/lib/Either'
import { toBlogEntry, parseToBlogEntry } from '@/assets/service/JsonParser'
// import * as blogEntry from '@/assets/interface/BlogEntry'

describe('toBlogInfo', () => {
  it('正常なデータをパースする', () => {
    const data = {
      title: 'test data',
      subtitle: 'test data',
      date: '2017-03-05 21:10:54 +0900 JST',
      categories: [],
      tags: [],
      summary: '',
      content: '',
      permalink: '',
      jsonlink: '',
      hasCoverImage: false,
      neighbor: {
        newer: null,
        older: null
      }
    }

    const result = toBlogEntry(data)
    expect(result.title).toBe('test data')
    expect(result.date.format()).toBe('2017-03-05T21:10:54+09:00')
    // pipe(
    //   toBlogEntry(data),
    //   either.fold(
    //     err => {
    //       throw err
    //     },
    //     val => {
    //       expect(val.title).toBe('test data')
    //       expect(val.date.format()).toBe('2017-03-05T21:10:54+09:00')
    //       done()
    //     }
    //   )
    // )
  })

  it('日付データパース失敗', () => {
    const data = {
      title: 'test data',
      subtitle: 'test data',
      date: 'foobar',
      categories: [],
      tags: [],
      summary: '',
      content: '',
      permalink: '',
      jsonlink: '',
      hasCoverImage: false,
      neighbor: {
        newer: null,
        older: null
      }
    }

    try {
      toBlogEntry(data)
    } catch (err) {
      expect(err).toBeTruthy()
      return
    }
    throw new Error('test failed')

    // pipe(
    //   toBlogEntry(data),
    //   either.fold(
    //     err => {
    //       expect(err instanceof Error).toBe(true)
    //       done()
    //     },
    //     val => {
    //       throw new Error('test has failed!')
    //     }
    //   )
    // )
  })

  it('異常なデータは失敗', () => {
    const data = {
      hoge: 'hoge'
    }

    try {
      toBlogEntry(data)
    } catch (err) {
      expect(err).toBeTruthy()
      return
    }
    throw new Error('test failed')
    // pipe(
    //   toBlogEntry(data),
    //   either.fold(
    //     err => {
    //       expect(err instanceof Error).toBe(true)
    //       done()
    //     },
    //     () => {
    //       throw new Error('test has failed!')
    //     }
    //   )
    // )
  })

  it('オブジェクト以外は受け入れない', () => {
    // const check = (err: Error): void => {
    //   expect(err instanceof Error).toBe(true)
    //   done()
    // }
    // const abort = (): void => {
    //   throw new Error('test has failed!')
    // }
    // pipe(
    //   toBlogEntry([]),
    //   either.fold(check, abort)
    // )
    // pipe(
    //   toBlogEntry(123),
    //   either.fold(check, abort)
    // )
    // pipe(
    //   toBlogEntry(''),
    //   either.fold(check, abort)
    // )
  })
})

describe('parseToBlogInfo', () => {
  it('正常なデータをパースする', done => {
    const jsonData = {
      data: [
        {
          title: 'Docker初挑戦メモ',
          subtitle: null,
          date: '2019-03-16 00:16:03 +0900 JST',
          categories: [{ name: 'Development', link: 'development' }],

          tags: [{ name: 'Docker', link: 'docker' }, { name: '雑記', link: '%E9%9B%91%E8%A8%98' }],
          jsonlink: 'https://blog.yuyasvx.me/post/2019/03/hello-docker/index.json',
          permalink: '/post/2019/03/hello-docker/',
          hasCoverImage: false
        },
        {
          title: 'Docker初挑戦メモ2',
          subtitle: null,
          date: '2019-03-16 01:16:03 +0900 JST',
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

    pipe(
      parseToBlogEntry(jsonData),
      either.fold(
        err => {
          throw err
        },
        () => {
          done()
        }
      )
    )
  })
})
