import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { GetUserDetailsUseCase } from './get-user-details'
import { makeUser } from 'test/factories/make-user'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserDetailsUseCase

describe('Get User Details', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserDetailsUseCase(inMemoryUsersRepository)
  })

  it('should be able to get user details', async () => {
    const user = makeUser()

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({ userId: user.id.toString() })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      userDetails: {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
    })
  })

  it('should not be able to get user details if user does not exist', async () => {
    const result = await sut.execute({ userId: 'non-existing-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
