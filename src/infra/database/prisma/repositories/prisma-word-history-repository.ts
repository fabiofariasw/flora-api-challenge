import { WordHistoryRepository } from '@/domain/dictionary/application/repositories/word-history-repository'
import { PrismaService } from '../prisma.service'
import { WordHistory } from '@/domain/dictionary/enterprise/entities/word-history'
import { Injectable } from '@nestjs/common'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { PaginationResponse } from '@/core/repositories/pagination-response'
import { PrismaWordHistoryMapper } from '../mappers/prisma-word-history.mapper'

@Injectable()
export class PrismaWordHistoryRepository implements WordHistoryRepository {
  constructor(private prisma: PrismaService) {}

  async findManyByUserId(
    userId: string,
    { page, limit, search }: PaginationParams,
  ): Promise<PaginationResponse<WordHistory[]>> {
    const userWordHistory = await this.prisma.history.findMany({
      where: {
        user_id: userId,
      },
      select: {
        word_id: true,
      },
    })

    const userWordIds = userWordHistory.map((history) => history.word_id)

    const filteredWords = await this.prisma.word.findMany({
      where: {
        id: {
          in: userWordIds,
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

    const filteredWordIds = filteredWords.map((word) => word.id)

    const total = await this.prisma.history.count({
      where: {
        user_id: userId,
        word_id: {
          in: filteredWordIds,
        },
      },
    })

    const wordHistory = await this.prisma.history.findMany({
      where: {
        user_id: userId,
        word_id: {
          in: filteredWordIds,
        },
      },
      include: {
        word: true,
      },
      take: limit,
      skip: (page - 1) * limit,
    })

    return {
      data: wordHistory.map(PrismaWordHistoryMapper.toDomain),
      total,
    }
  }

  async findByUserIdWithWordId(
    userId: string,
    wordId: number,
  ): Promise<WordHistory | null> {
    const wordHistory = await this.prisma.history.findFirst({
      where: {
        user_id: userId,
        word_id: wordId,
      },
    })

    if (!wordHistory) {
      return null
    }

    return PrismaWordHistoryMapper.toDomain(wordHistory)
  }

  async create(wordHistory: WordHistory): Promise<void> {
    const data = {
      word_id: wordHistory.wordId,
      user_id: wordHistory.userId,
    }

    await this.prisma.history.create({
      data,
    })
  }
}
