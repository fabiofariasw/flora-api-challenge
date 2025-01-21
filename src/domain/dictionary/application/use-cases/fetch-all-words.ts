import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { WordsRepository } from '../repositories/words-repository'
import { Word } from '../../enterprise/entities/word'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { PaginationResponse } from '@/core/repositories/pagination-response'

interface FetchAllWordsUseCaseRequest extends PaginationParams {}

type FetchAllWordsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    words: PaginationResponse<Word[]>
  }
>

@Injectable()
export class FetchAllWordsUseCase {
  constructor(private wordsRepository: WordsRepository) {}

  async execute(
    params: FetchAllWordsUseCaseRequest,
  ): Promise<FetchAllWordsUseCaseResponse> {
    const words = await this.wordsRepository.findAll(params)

    const totalPages = Math.ceil(words.total / params.limit)

    if (params.page > totalPages) {
      return left(new ResourceNotFoundError())
    }

    return right({
      words: {
        ...words,
        page: params.page,
        limit: params.limit,
        totalPages,
      },
    })
  }
}
