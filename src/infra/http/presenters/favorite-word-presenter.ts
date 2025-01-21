import { PaginationResponse } from '@/core/repositories/pagination-response'
import { FavoriteWord } from '@/domain/dictionary/enterprise/entities/favorite-word'

export class FavoriteWordPresenter {
  static toHTTP(favoriteWord: PaginationResponse<FavoriteWord[]>) {
    const results = favoriteWord.data.map((favorite) => ({
      word: favorite.word,
      added: favorite.addedAt,
    }))

    return {
      results,
      page: favoriteWord.page,
      limit: favoriteWord.limit,
      totalPages: favoriteWord.totalPages,
      totalDocs: favoriteWord.total,
    }
  }
}
