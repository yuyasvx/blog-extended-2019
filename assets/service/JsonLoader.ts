// import * as either from 'fp-ts/lib/Either'
// import { pipe } from 'fp-ts/lib/pipeable'
// import BlogEntry from '../interface/BlogEntry'
// import { blogConfig } from '../config/BlogConfig'
// import { toBlogEntry } from '@/assets/service/JsonParser'

// export const getWithPath = async (path: string, filename: string = 'index'): BlogEntry | BlogEntry[] => {
//   // let preparedPath = path
//   // if (preparedPath.startsWith('/') === false) {
//   //   preparedPath = `/${preparedPath}`
//   // }
//   // if (preparedPath.endsWith('/') === false) {
//   //   preparedPath = `${preparedPath}/`
//   // }
//   // let data
//   // if (config.isBuilding) {
//   //   preparedPath = decodeURIComponent(preparedPath)
//   //   const a = pipe(
//   //     parseToBlogEntry(await import(`${blogConfig.baseJsonPath}${preparedPath}${filename}.json`)),
//   //     either.
//   //   )
//   //   console.log(a)
//   // } else {
//   //   // data = await axios
//   //   //   .get(`${config.asyncDataLocation}${preparedPath}${filename}.json`)
//   //   //   .then(res => res.data);
//   //   preparedPath = decodeURIComponent(preparedPath)
//   //   data = await import(`~/blog/public${preparedPath}${filename}.json`)
//   // }
//   // return {
//   //   articleInfo: data.data
//   // }
// }
