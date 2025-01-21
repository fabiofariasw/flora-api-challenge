import { Entity } from '@/core/entities/entity'

export interface WordHistoryProps {
  userId: string
  wordId: number
  addedAt: Date
  word: string
}

export class WordHistory extends Entity<WordHistoryProps> {
  get userId() {
    return this.props.userId
  }

  get wordId() {
    return this.props.wordId
  }

  get addedAt() {
    return this.props.addedAt
  }

  get word() {
    return this.props.word
  }

  static create(props: WordHistoryProps) {
    return new WordHistory(props)
  }
}
