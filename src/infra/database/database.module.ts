import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UsersRepository } from '@/domain/dictionary/application/repositories/users-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { WordsRepository } from '@/domain/dictionary/application/repositories/words-repository'
import { PrismaWordsRepository } from './prisma/repositories/prisma-words-repository'
import { FavoriteWordsRepository } from '@/domain/dictionary/application/repositories/favorite-words-repository'
import { PrismaFavoriteWordsRepository } from './prisma/repositories/prisma-favorite-words-repository'
import { WordHistoryRepository } from '@/domain/dictionary/application/repositories/word-history-repository'
import { PrismaWordHistoryRepository } from './prisma/repositories/prisma-word-history-repository'

@Module({
  // imports: [],
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    { provide: WordsRepository, useClass: PrismaWordsRepository },
    {
      provide: FavoriteWordsRepository,
      useClass: PrismaFavoriteWordsRepository,
    },
    { provide: WordHistoryRepository, useClass: PrismaWordHistoryRepository },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    WordsRepository,
    FavoriteWordsRepository,
    WordHistoryRepository,
  ],
})
export class DatabaseModule {}
