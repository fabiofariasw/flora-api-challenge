import { PaginationParams } from '@/core/repositories/pagination-params'
import { WordHistory } from '../../enterprise/entities/word-history'
import { PaginationResponse } from '@/core/repositories/pagination-response'

export abstract class WordHistoryRepository {
  abstract findManyByUserId(
    userId: string,
    params: PaginationParams,
  ): Promise<PaginationResponse<WordHistory[]>>

  abstract findByUserIdWithWordId(
    userId: string,
    wordId: number,
  ): Promise<WordHistory | null>

  abstract create(
    wordHistory: Pick<WordHistory, 'userId' | 'wordId'>,
  ): Promise<void>
}
