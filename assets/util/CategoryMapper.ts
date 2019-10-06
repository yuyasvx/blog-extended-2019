import { pipe } from 'fp-ts/lib/pipeable'
import { getOrElse, map as OMap, fromNullable } from 'fp-ts/lib/Option'
import { Either, tryCatch } from 'fp-ts/lib/Either'
import CategoryProp from '@/assets/interface/CategoryProp'
import NotFoundError from '@/assets/error/NotFoundError'
import CategoryConfig from '@/assets/config/CategoryConfig'

export const getDisplayName = (id: string): string => {
  return pipe(
    fromNullable(CategoryConfig.find(prop => prop.id === id)),
    OMap(prop => prop.displayName),
    getOrElse(() => id)
  )
}

export const getShortName = (id: string): string => {
  return pipe(
    fromNullable(CategoryConfig.find(prop => prop.id === id)),
    OMap(prop => prop.shortName),
    getOrElse(() => id)
  )
}

export const findCategory = (id: string): CategoryProp => {
  const result = CategoryConfig.find(prop => prop.id === id)
  if (result === undefined) {
    throw new NotFoundError('findCategory: found 0.')
  }
  return result
}

export const findCategoryE = (id: string): Either<NotFoundError, CategoryProp> => {
  return tryCatch(() => findCategory(id), (a: unknown) => a as NotFoundError)
}
