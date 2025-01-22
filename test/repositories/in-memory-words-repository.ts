import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { PaginationResponse } from '@/core/repositories/pagination-response'
import { WordsRepository } from '@/domain/dictionary/application/repositories/words-repository'
import { Word } from '@/domain/dictionary/enterprise/entities/word'

export class InMemoryWordsRepository implements WordsRepository {
  public items: Word[] = []

  async findAll(params: PaginationParams): Promise<PaginationResponse<Word[]>> {
    const paginatedItems = this.items.slice(
      (params.page - 1) * params.limit,
      params.page * params.limit,
    )

    return {
      data: paginatedItems,
      total: this.items.length,
    }
  }

  async findByName(name: string) {
    const word = this.items.find((item) => item.name === name)

    if (!word) {
      return null
    }

    return Word.create(word)
  }

  async findById(id: number) {
    const word = this.items.find((item) => item.id === id)

    if (!word) {
      return null
    }

    return Word.create(word)
  }

  async create(word: Word) {
    this.items.push(word)
  }
}
