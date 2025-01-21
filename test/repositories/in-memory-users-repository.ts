import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UsersRepository } from '@/domain/dictionary/application/repositories/users-repository'
import { User } from '@/domain/dictionary/enterprise/entities/user'
import { UserDetails } from '@/domain/dictionary/enterprise/entities/value-objects/user-details'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id.toString() === id)

    if (!user) {
      return null
    }

    return UserDetails.create({
      userId: new UniqueEntityID(user.id.toString()),
      name: user.name,
      email: user.email,
    })
  }

  async create(user: User) {
    this.items.push(user)
  }
}
