import { WordHistory } from '@/domain/dictionary/enterprise/entities/word-history'
import { History } from '@prisma/client'

interface PrismaWordHistory extends History {
  word?: {
    id: number
    name: string
  }
}

export class PrismaWordHistoryMapper {
  static toDomain(raw: PrismaWordHistory): WordHistory {
    return WordHistory.create({
      userId: raw.user_id,
      wordId: raw.word_id,
      addedAt: raw.addedAt,
      word: raw?.word?.name ?? '',
    })
  }
}
