import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  WordHistory,
  WordHistoryProps,
} from '@/domain/dictionary/enterprise/entities/word-history'

export function makeWordHistory(override: Partial<WordHistoryProps>) {
  const wordHistory = WordHistory.create({
    userId: new UniqueEntityID().toString(),
    addedAt: faker.date.recent(),
    word: {
      id: faker.number.int({ max: 100 }),
      name: faker.word.words(),
    },
    ...override,
  })

  return wordHistory
}
