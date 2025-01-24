import { Word as PrismaWord } from '@prisma/client'
import { Word } from '@/domain/dictionary/enterprise/entities/word'

export class PrismaWordMapper {
  static toDomain(raw: PrismaWord): Word {
    return Word.create(raw)
  }
}
