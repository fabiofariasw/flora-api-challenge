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
      userId: raw.user_id,
      // wordId: raw.word.id,
      word: {
        id: raw.word.id,
        name: raw.word.name,
      },
      // word: raw.word.name,
      addedAt: raw.addedAt,
    })
  }

  static toPrisma() {}
}
