import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { FavoriteWord } from '../../enterprise/entities/favorite-word'
import { FavoriteWordsRepository } from '../repositories/favorite-words-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { PaginationResponse } from '@/core/repositories/pagination-response'

interface FetchFavoriteWordsUseCaseRequest {
  userId: string
  page: number
  limit: number
  search: string
}

type FetchFavoriteWordsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    favoriteWords: PaginationResponse<FavoriteWord[]>
  }
>

@Injectable()
export class FetchFavoriteWordsUseCase {
  constructor(private favoriteWordRepository: FavoriteWordsRepository) {}

  async execute({
    userId,
    ...params
  }: FetchFavoriteWordsUseCaseRequest): Promise<FetchFavoriteWordsUseCaseResponse> {
    const favoriteWords = await this.favoriteWordRepository.findManyByUserId(
      userId,
      { ...params },
    )

    const totalPages = Math.ceil(favoriteWords.total / params.limit)

    if (params.page > totalPages) {
      return left(new ResourceNotFoundError())
    }

    return right({
      favoriteWords: {
        ...favoriteWords,
        page: params.page,
        limit: params.limit,
        totalPages,
      },
    })
  }
}
