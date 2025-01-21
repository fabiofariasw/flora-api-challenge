import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

export interface UserDetailsProps {
  userId: UniqueEntityID
  name: string
  email: string
}

export class UserDetails extends ValueObject<UserDetailsProps> {
  get userId() {
    return this.props.userId
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  static create(props: UserDetailsProps) {
    return new UserDetails(props)
  }
}
