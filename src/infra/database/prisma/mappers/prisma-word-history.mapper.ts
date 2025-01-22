import { WordHistory } from '@/domain/dictionary/enterprise/entities/word-history'

interface PrismaWordHistory {
  user_id: string
  addedAt: Date
  word: {
    id: number
    name: string
  }
}

export class PrismaWordHistoryMapper {
  static toDomain(raw: PrismaWordHistory): WordHistory {
    return WordHistory.create({
      userId: raw.user_id,
      word: {
        id: raw.word.id,
        name: raw.word.name,
      },
      addedAt: raw.addedAt,
    })
  }
}
