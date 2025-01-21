import { Injectable } from '@nestjs/common'
import { UsersRepository } from '@/domain/dictionary/application/repositories/users-repository'
import { PrismaService } from '../prisma.service'
import { User } from '@/domain/dictionary/enterprise/entities/user'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { PrismaUserDetailsMapper } from '../mappers/prisma-user-details-mapper'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserDetailsMapper.toDomain(user)
  }

  async create(user: User) {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.create({
      data,
    })
  }
}
