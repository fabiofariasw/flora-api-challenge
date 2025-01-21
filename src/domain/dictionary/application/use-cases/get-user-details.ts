import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { UserDetails } from '../../enterprise/entities/value-objects/user-details'
import { Either, left, right } from '@/core/either'
import { UsersRepository } from '../repositories/users-repository'

interface GetUserDetailsUseCaseRequest {
  userId: string
}

type GetUserDetailsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    userDetails: UserDetails
  }
>

@Injectable()
export class GetUserDetailsUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserDetailsUseCaseRequest): Promise<GetUserDetailsUseCaseResponse> {
    const userDetails = await this.usersRepository.findById(userId)

    if (!userDetails) {
      return left(new ResourceNotFoundError())
    }

    return right({
      userDetails,
    })
  }
}
