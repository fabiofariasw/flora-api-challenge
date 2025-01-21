import { PaginationResponse } from '@/core/repositories/pagination-response'
import { Word } from '@/domain/dictionary/enterprise/entities/word'

export class WordPresenter {
  static toHTTP(word: PaginationResponse<Word[]>) {
    const results = word.data.map((word) => word.name)

    return {
      results,
      page: word.page,
      limit: word.limit,
      totalPages: word.totalPages,
      totalDocs: word.total,
    }
  }
}
