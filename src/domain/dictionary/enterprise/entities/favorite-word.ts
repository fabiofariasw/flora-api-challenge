import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'

export interface FavoriteWordProps {
  userId: string
  word: {
    id: number
    name: string
  }
  addedAt: Date
}

export class FavoriteWord extends Entity<FavoriteWordProps> {
  get userId() {
    return this.props.userId
  }

  get name() {
    return this.props.word.name
  }

  get word() {
    return this.props.word
  }

  get wordId() {
    return this.props.word.id
  }

  get addedAt() {
    return this.props.addedAt
  }

  static create(props: Optional<FavoriteWordProps, 'addedAt'>) {
    const favoriteWord = new FavoriteWord({
      ...props,
      addedAt: props.addedAt ?? new Date(),
    })

    return favoriteWord
  }
}
