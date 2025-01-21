import { PaginationResponse } from '@/core/repositories/pagination-response'
import { WordHistory } from '@/domain/dictionary/enterprise/entities/word-history'

export class WordHistoryPresenter {
  static toHTTP(wordHistory: PaginationResponse<WordHistory[]>) {
    const results = wordHistory.data.map((history) => ({
      word: history.word,
      added: history.addedAt,
    }))

    return {
      results,
      page: wordHistory.page,
      limit: wordHistory.limit,
      totalPages: wordHistory.totalPages,
      totalDocs: wordHistory.total,
    }
  }
}
