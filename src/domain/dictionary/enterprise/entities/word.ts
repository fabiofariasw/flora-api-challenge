import { Entity } from '@/core/entities/entity'

export interface WordProps {
  name: string
  id: number
}

export class Word extends Entity<WordProps> {
  get name(): string {
    return this.props.name
  }

  get id(): number {
    return this.props.id
  }

  public static create(props: WordProps): Word {
    return new Word(props)
  }
}
