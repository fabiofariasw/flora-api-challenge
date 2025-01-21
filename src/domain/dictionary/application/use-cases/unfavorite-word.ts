import { Injectable } from '@nestjs/common'
import { WordsRepository } from '../repositories/words-repository'
import { FavoriteWordsRepository } from '../repositories/favorite-words-repository'
import { left, right, Either } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface UnfavoriteWordUseCaseRequest {
  userId: string
  word: string
}

type UnfavoriteWordUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class UnfavoriteWordUseCase {
  constructor(
    private wordsRepository: WordsRepository,
    private favoriteWordsRepository: FavoriteWordsRepository,
  ) {}

  async execute({
    userId,
    word,
  }: UnfavoriteWordUseCaseRequest): Promise<UnfavoriteWordUseCaseResponse> {
    const wordData = await this.wordsRepository.findByName(word)

    if (!wordData) {
      return left(new ResourceNotFoundError())
    }

    const favoriteWord = await this.favoriteWordsRepository.findWordByUserId(
      userId,
      wordData.id,
    )

    if (!favoriteWord) {
      return left(new ResourceNotFoundError())
    }

    await this.favoriteWordsRepository.delete({
      userId,
      wordId: wordData.id,
    })

    return right(null)
  }
}
