import { User as PrismaUser } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserDetails } from '@/domain/dictionary/enterprise/entities/value-objects/user-details'

export class PrismaUserDetailsMapper {
  static toDomain(raw: PrismaUser): UserDetails {
    return UserDetails.create({
      userId: new UniqueEntityID(raw.id),
      name: raw.name,
      email: raw.email,
    })
  }
}
