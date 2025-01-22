import { PaginationParams } from '@/core/repositories/pagination-params'
import { FavoriteWordsRepository } from '@/domain/dictionary/application/repositories/favorite-words-repository'
import { FavoriteWord } from '@/domain/dictionary/enterprise/entities/favorite-word'

export class InMemoryFavoriteWordsRepository
  implements FavoriteWordsRepository
{
  public items: FavoriteWord[] = []

  async findWordByUserId(userId: string, wordId: number) {
    const favoriteWord = this.items.find(
      (item) => item.userId === userId && item.wordId === wordId,
    )

    if (!favoriteWord) {
      return null
    }

    return FavoriteWord.create(favoriteWord)
  }

  async findManyByUserId(userId: string, params: PaginationParams) {
    const userFavoriteWords = this.items.filter(
      (item) =>
        item.userId === userId && item.word.name.includes(params.search),
    )
    const paginatedItems = userFavoriteWords.slice(
      (params.page - 1) * params.limit,
      params.page * params.limit,
    )

    return {
      data: paginatedItems,
      total: userFavoriteWords.length,
    }
  }

  async create(favoriteWord: FavoriteWord): Promise<void> {
    this.items.push(favoriteWord)
  }

  async delete(favoriteWord: FavoriteWord) {
    this.items = this.items.filter(
      (item) =>
        item.userId !== favoriteWord.userId &&
        item.wordId !== favoriteWord.wordId,
    )
  }
}
