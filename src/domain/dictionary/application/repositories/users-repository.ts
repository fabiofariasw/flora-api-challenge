import { User } from '../../enterprise/entities/user'
import { UserDetails } from '../../enterprise/entities/value-objects/user-details'

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>
  abstract findById(id: string): Promise<UserDetails | null>
  abstract create(user: User): Promise<void>
}
