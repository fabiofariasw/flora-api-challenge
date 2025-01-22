import { PaginationParams } from '@/core/repositories/pagination-params'
import { WordHistoryRepository } from '@/domain/dictionary/application/repositories/word-history-repository'
import { WordHistory } from '@/domain/dictionary/enterprise/entities/word-history'

export class InMemoryWordHistoryRepository implements WordHistoryRepository {
  public items: WordHistory[] = []

  async findManyByUserId(userId: string, params: PaginationParams) {
    const userWordHistory = this.items.filter(
      (item) =>
        item.userId === userId && item.word.name.includes(params.search),
    )
    const paginatedItems = userWordHistory.slice(
      (params.page - 1) * params.limit,
      params.page * params.limit,
    )

    return {
      data: paginatedItems,
      total: userWordHistory.length,
    }
  }

  async findByUserIdWithWordId(userId: string, wordId: number) {
    const wordHistory = this.items.find(
      (item) => item.userId === userId && item.wordId === wordId,
    )

    if (!wordHistory) {
      return null
    }

    return WordHistory.create(wordHistory)
  }

  async create(wordHistory: WordHistory) {
    this.items.push(wordHistory)
  }
}
