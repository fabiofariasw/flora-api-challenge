import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { WordDetails } from '../../enterprise/entities/value-objects/word-details'
import { DictionaryApiService } from '@/infra/http/external/dictionary-api.service'
import { WordHistoryRepository } from '../repositories/word-history-repository'
import { WordsRepository } from '../repositories/words-repository'

interface GetWordDetailsByNameUseCaseRequest {
  userId: string
  word: string
}

type GetWordDetailsByNameUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    wordDetails: WordDetails
  }
>

@Injectable()
export class GetWordDetailsByNameUseCase {
  constructor(
    private dictionaryApiService: DictionaryApiService,
    private wordsRepository: WordsRepository,
    private wordHistoryRepository: WordHistoryRepository,
  ) {}

  async execute({
    userId,
    word,
  }: GetWordDetailsByNameUseCaseRequest): Promise<GetWordDetailsByNameUseCaseResponse> {
    try {
      const wordData = await this.wordsRepository.findByName(word)

      if (!wordData) {
        return left(new ResourceNotFoundError())
      }

      const wordDetails = await this.dictionaryApiService.getWordDetails(word)

      const historyWithSameWord =
        await this.wordHistoryRepository.findByUserIdWithWordId(
          userId,
          wordData.id,
        )

      if (historyWithSameWord) {
        return right({
          wordDetails,
        })
      }

      await this.wordHistoryRepository.create({
        userId,
        wordId: wordData?.id,
      })

      return right({
        wordDetails,
      })
    } catch (err) {
      return left(new ResourceNotFoundError())
    }
  }
}
