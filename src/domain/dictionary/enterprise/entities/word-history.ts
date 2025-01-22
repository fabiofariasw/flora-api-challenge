import { Entity } from '@/core/entities/entity'

export interface WordHistoryProps {
  userId: string
  word: {
    id: number
    name: string
  }
  addedAt: Date
}

export class WordHistory extends Entity<WordHistoryProps> {
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

  static create(props: WordHistoryProps) {
    return new WordHistory(props)
  }
}
