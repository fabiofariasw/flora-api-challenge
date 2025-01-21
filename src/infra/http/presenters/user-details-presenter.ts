import { UserDetails } from '@/domain/dictionary/enterprise/entities/value-objects/user-details'

export class UserDetailsPresenter {
  static toHTTP(userDetails: UserDetails) {
    return {
      userId: userDetails.userId.toString(),
      name: userDetails.name,
      email: userDetails.email,
    }
  }
}
