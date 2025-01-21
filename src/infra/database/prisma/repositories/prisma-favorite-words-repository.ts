import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { FavoriteWordsRepository } from '@/domain/dictionary/application/repositories/favorite-words-repository'
import { FavoriteWord } from '@/domain/dictionary/enterprise/entities/favorite-word'
import { PrismaFavoriteWordMapper } from '../mappers/prisma-favorite-word-mapper'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { PaginationResponse } from '@/core/repositories/pagination-response'

@Injectable()
export class PrismaFavoriteWordsRepository implements FavoriteWordsRepository {
  constructor(private prisma: PrismaService) {}

  async findWordByUserId(
    userId: string,
    wordId: number,
  ): Promise<FavoriteWord | null> {
    const favoriteWord = await this.prisma.favoriteWord.findFirst({
      where: {
        user_id: userId,
        word_id: wordId,
      },
      include: {
        word: true,
      },
    })

    if (!favoriteWord) {
      return null
    }

    return PrismaFavoriteWordMapper.toDomain(favoriteWord)
  }

  async findManyByUserId(
    userId: string,
    { page, limit, search }: PaginationParams,
  ): Promise<PaginationResponse<FavoriteWord[]>> {
    const userFavoriteWords = await this.prisma.favoriteWord.findMany({
      where: {
        user_id: userId,
      },
      select: {
        word_id: true,
      },
    })

    const wordIds = userFavoriteWords.map(
      (favoriteWord) => favoriteWord.word_id,
    )

    const filteredFavoriteWords = await this.prisma.word.findMany({
      where: {
        id: {
          in: wordIds,
        },
        ...(search && {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        }),
      },
      select: {
        id: true,
      },
    })

    const filteredFavoriteWordsIds = filteredFavoriteWords.map(
      (word) => word.id,
    )

    const total = await this.prisma.favoriteWord.count({
      where: {
        user_id: userId,
        word_id: {
          in: filteredFavoriteWordsIds,
        },
      },
    })

    const favoriteWords = await this.prisma.favoriteWord.findMany({
      where: {
        user_id: userId,
        word_id: {
          in: filteredFavoriteWordsIds,
        },
      },
      include: {
        word: true,
      },
      take: limit,
      skip: (page - 1) * limit,
    })

    return {
      data: favoriteWords.map(PrismaFavoriteWordMapper.toDomain),
      total,
    }
  }

  async create(favoriteWord: FavoriteWord): Promise<void> {
    const data = {
      word_id: favoriteWord.wordId,
      user_id: favoriteWord.userId,
    }

    await this.prisma.favoriteWord.create({
      data,
    })
  }

  async delete(favoriteWord: FavoriteWord): Promise<void> {
    await this.prisma.favoriteWord.delete({
      where: {
        user_id_word_id: {
          user_id: favoriteWord.userId,
          word_id: favoriteWord.wordId,
        },
      },
    })
  }
}
