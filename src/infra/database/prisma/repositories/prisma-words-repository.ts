import { WordsRepository } from '@/domain/dictionary/application/repositories/words-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { PrismaWordMapper } from '../mappers/prisma-word-mapper'
import { Word } from '@/domain/dictionary/enterprise/entities/word'
import { PaginationResponse } from '@/core/repositories/pagination-response'

@Injectable()
export class PrismaWordsRepository implements WordsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll({
    page,
    limit,
    search,
  }: PaginationParams): Promise<PaginationResponse<Word[]>> {
    const words = await this.prisma.word.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      take: limit,
      skip: (page - 1) * limit,
    })

    const total = await this.prisma.word.count({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
    })

    return {
      data: words.map(PrismaWordMapper.toDomain),
      total,
    }
  }

  async findByName(name: string): Promise<Word | null> {
    const word = await this.prisma.word.findFirst({
      where: {
        name,
      },
    })

    if (!word) {
      return null
    }

    return PrismaWordMapper.toDomain(word)
  }
}
