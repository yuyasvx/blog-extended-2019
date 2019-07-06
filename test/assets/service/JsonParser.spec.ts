import { pipe } from 'fp-ts/lib/pipeable'
import * as either from 'fp-ts/lib/Either'
import { parseToBlogEntry } from '@/assets/service/JsonParser'
// import * as blogEntry from '@/assets/interface/BlogEntry'

describe('parseToBlogInfo', () => {
  it('正常なデータをパースする', done => {
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
    pipe(
      parseToBlogEntry(data),
      either.fold(
        err => {
          throw err
        },
        val => {
          expect(val.title).toBe('test data')
          done()
        }
      )
    )
  })

  it('日付データパース失敗', done => {
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
    pipe(
      parseToBlogEntry(data),
      either.fold(
        err => {
          expect(err instanceof Error).toBe(true)
          done()
        },
        val => {
          console.log(val)
          throw new Error('test has failed!')
        }
      )
    )
  })

  it('異常なデータは失敗', done => {
    const data = {
      hoge: 'hoge'
    }
    pipe(
      parseToBlogEntry(data),
      either.fold(
        err => {
          expect(err instanceof Error).toBe(true)
          done()
        },
        val => {
          console.log(val)
          throw new Error('test has failed!')
        }
      )
    )
  })

  it('オブジェクト以外は受け入れない', done => {
    const check = (err: Error): void => {
      expect(err instanceof Error).toBe(true)
      done()
    }
    const abort = (): void => {
      throw new Error('test has failed!')
    }

    pipe(
      parseToBlogEntry([]),
      either.fold(check, abort)
    )

    pipe(
      parseToBlogEntry(123),
      either.fold(check, abort)
    )

    pipe(
      parseToBlogEntry(''),
      either.fold(check, abort)
    )
  })
})
