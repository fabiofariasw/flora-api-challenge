import { ValueObject } from '@/core/entities/value-object'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface WordDetailsProps {
  word: string
  phonetics: any
  meanings: any
}

export class WordDetails extends ValueObject<WordDetailsProps> {
  get word() {
    return this.props.word
  }

  get phonetics() {
    return this.props.phonetics
  }

  get meanings() {
    return this.props.meanings
  }

  static create(props: WordDetailsProps) {
    return new WordDetails(props)
  }
}
