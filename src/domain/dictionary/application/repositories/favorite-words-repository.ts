import { PaginationParams } from '@/core/repositories/pagination-params'
import { FavoriteWord } from '../../enterprise/entities/favorite-word'
import { PaginationResponse } from '@/core/repositories/pagination-response'

export abstract class FavoriteWordsRepository {
  abstract findWordByUserId(
    userId: string,
    wordId: number,
  ): Promise<FavoriteWord | null>

  abstract findManyByUserId(
    userId: string,
    params: PaginationParams,
  ): Promise<PaginationResponse<FavoriteWord[]>>

  abstract create(
    favoriteWord: Pick<FavoriteWord, 'userId' | 'wordId'>,
  ): Promise<void>

  abstract delete(
    favoriteWord: Pick<FavoriteWord, 'userId' | 'wordId'>,
  ): Promise<void>
}
