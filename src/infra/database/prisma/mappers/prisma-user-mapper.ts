import { User as PrismaUser, Prisma } from '@prisma/client'
import { User } from '@/domain/dictionary/enterprise/entities/user'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
    }
  }
}
