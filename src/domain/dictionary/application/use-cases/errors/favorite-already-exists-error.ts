import { UseCaseError } from '@/core/errors/use-case-error'

export class FavoriteAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Favorite ${identifier} already exists.`)
  }
}
