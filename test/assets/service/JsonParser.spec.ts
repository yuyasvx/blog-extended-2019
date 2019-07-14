import { pipe } from 'fp-ts/lib/pipeable'
import * as either from 'fp-ts/lib/Either'
import { toBlogEntry, parseJsonObjectE } from '@/assets/service/JsonParser'
// import * as blogEntry from '@/assets/interface/BlogEntry'

describe('toBlogEntry', () => {
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
    expect(result.date.isValid()).toBe(true)
    expect(result.date.toISOString()).toBe('2017-03-05T12:10:54.000Z')
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
  })

  it('オブジェクト以外は受け入れない', () => {
    const check = (err: unknown): void => {
      expect(err instanceof Error).toBe(true)
    }
    pipe(either.tryCatch(() => toBlogEntry([]), check))
    pipe(either.tryCatch(() => toBlogEntry(123), check))
    pipe(either.tryCatch(() => toBlogEntry(''), check))
  })
})

describe('parseToBlogInfo', () => {
  it('正常なデータをパースする', () => {
    const jsonData = {
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
        },
        {
          title: 'test title 2',
          subtitle: null,
          date: '2019-03-16 01:16:03 +0900 JST',
          categories: [{ name: 'Development', link: 'development' }],
          tags: [{ name: 'Docker', link: 'docker' }, { name: '雑記', link: '%E9%9B%91%E8%A8%98' }],
          jsonlink: 'https://blog.yuyasvx.me/post/2019/03/hello-docker/index.json',
          permalink: '/post/2019/03/hello-docker/',
          hasCoverImage: false
        },
        {
          title: 'test title 3',
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
      parseJsonObjectE(jsonData),
      either.fold(
        err => {
          throw err
        },
        data => {
          expect(data.length).toBe(3)
          data.forEach((d, i) => {
            expect(d.title).toBe(jsonData.data[i].title)
          })
        }
      )
    )
  })

  it('json.dataが配列ではなく単一のデータ', () => {
    const jsonData = {
      data: {
        title: 'test title 1',
        subtitle: null,
        date: '2019-03-16 00:16:03 +0900 JST',
        categories: [{ name: 'Development', link: 'development' }],
        tags: [{ name: 'Docker', link: 'docker' }, { name: '雑記', link: '%E9%9B%91%E8%A8%98' }],
        jsonlink: 'https://blog.yuyasvx.me/post/2019/03/hello-docker/index.json',
        permalink: '/post/2019/03/hello-docker/',
        hasCoverImage: false
      }
    }

    pipe(
      parseJsonObjectE(jsonData),
      either.fold(
        err => {
          throw err
        },
        data => {
          const toString = Object.prototype.toString
          expect(toString.call(data[0])).toBe('[object Object]')
          expect(data[0].title).toBe('test title 1')
        }
      )
    )
  })
})
