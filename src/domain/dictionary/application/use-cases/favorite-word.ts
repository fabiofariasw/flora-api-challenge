import { Injectable } from '@nestjs/common'
import { FavoriteWordsRepository } from '../repositories/favorite-words-repository'
import { Either, left, right } from '@/core/either'
import { WordsRepository } from '../repositories/words-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { FavoriteAlreadyExistsError } from './errors/favorite-already-exists-error'

interface FavoriteWordUseCaseRequest {
  userId: string
  word: string
}

type FavoriteWordUseCaseResponse = Either<
  ResourceNotFoundError | FavoriteAlreadyExistsError,
  null
>

@Injectable()
export class FavoriteWordUseCase {
  constructor(
    private wordsRepository: WordsRepository,
    private favoriteWordsRepository: FavoriteWordsRepository,
  ) {}

  async execute({
    userId,
    word,
  }: FavoriteWordUseCaseRequest): Promise<FavoriteWordUseCaseResponse> {
    const wordData = await this.wordsRepository.findByName(word)

    if (!wordData) {
      return left(new ResourceNotFoundError())
    }

    const favoriteWithSameWord =
      await this.favoriteWordsRepository.findWordByUserId(userId, wordData.id)

    if (favoriteWithSameWord) {
      return left(new FavoriteAlreadyExistsError(word))
    }

    const favoriteWord = {
      wordId: wordData.id,
      userId,
    }

    await this.favoriteWordsRepository.create(favoriteWord)

    return right(null)
  }
}
