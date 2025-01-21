import { FavoriteWord } from '@/domain/dictionary/enterprise/entities/favorite-word'
// import { FavoriteWord as PrismaFavoriteWord } from '@prisma/client'

interface PrismaFavoriteWordProps {
  user_id: string
  addedAt: Date
  word: {
    id: number
    name: string
  }
}

export class PrismaFavoriteWordMapper {
  static toDomain(raw: PrismaFavoriteWordProps) {
    return FavoriteWord.create({
      wordId: raw.word.id,
      word: raw.word.name,
      userId: raw.user_id,
      addedAt: raw.addedAt,
    })
  }

  static toPrisma() {}
}
