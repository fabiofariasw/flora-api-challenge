import { PaginationParams } from '@/core/repositories/pagination-params'
import { Word } from '../../enterprise/entities/word'
import { PaginationResponse } from '@/core/repositories/pagination-response'

export abstract class WordsRepository {
  abstract findAll(
    params: PaginationParams,
  ): Promise<PaginationResponse<Word[]>>

  abstract findByName(name: string): Promise<Word | null>
}
