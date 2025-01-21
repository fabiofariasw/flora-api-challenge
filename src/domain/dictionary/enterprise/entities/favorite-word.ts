import { Entity } from '@/core/entities/entity'

export interface FavoriteWordProps {
  userId: string
  wordId: number
  word: string
  addedAt: Date
}

export class FavoriteWord extends Entity<FavoriteWordProps> {
  get userId() {
    return this.props.userId
  }

  get word() {
    return this.props.word
  }

  get wordId() {
    return this.props.wordId
  }

  get addedAt() {
    return this.props.addedAt
  }

  static create(props: FavoriteWordProps, id?: number) {
    const favoriteWord = new FavoriteWord(props, id)

    return favoriteWord
  }
}
