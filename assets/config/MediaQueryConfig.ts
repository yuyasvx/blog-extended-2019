import { pipe } from 'fp-ts/lib/pipeable'
import * as option from 'fp-ts/lib/Option'

const mq = {
  defaultBreakpoint: 'wider',
  breakpoints: {
    narrowest: 549,
    narrower: 699,
    narrow: 999,
    wide: 1279,
    wider: 1439,
    widest: 1440,
    lg: Infinity
  }
}

export const getWidth = (breakpointName: string): number => {
  const points: { [key: string]: number } = mq.breakpoints
  return pipe(
    option.fromNullable(Object.keys(points).find(k => k === breakpointName)),
    option.map(key => points[key]),
    option.getOrElse(() => points[mq.defaultBreakpoint])
  )
}

export default mq
