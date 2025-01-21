import { Either, left, right } from '@/core/either'
import { WordHistory } from '../../enterprise/entities/word-history'
import { Injectable } from '@nestjs/common'
import { WordHistoryRepository } from '../repositories/word-history-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { PaginationResponse } from '@/core/repositories/pagination-response'

interface FetchWordHistoryUseCaseRequest {
  userId: string
  page: number
  limit: number
  search: string
}

type FetchWordHistoryUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    wordHistory: PaginationResponse<WordHistory[]>
  }
>

@Injectable()
export class FetchWordHistoryUseCase {
  constructor(private wordHistoryRepository: WordHistoryRepository) {}

  async execute({
    userId,
    ...params
  }: FetchWordHistoryUseCaseRequest): Promise<FetchWordHistoryUseCaseResponse> {
    const wordHistory = await this.wordHistoryRepository.findManyByUserId(
      userId,
      { ...params },
    )

    const totalPages = Math.ceil(wordHistory.total / params.limit)

    if (params.page > totalPages) {
      return left(new ResourceNotFoundError())
    }

    return right({
      wordHistory: {
        ...wordHistory,
        page: params.page,
        limit: params.limit,
        totalPages,
      },
    })
  }
}
