import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { InMemoryWordHistoryRepository } from 'test/repositories/in-memory-word-history-repository'
import { FetchWordHistoryUseCase } from './fetch-word-history'
import { makeUser } from 'test/factories/make-user'
import { makeWordHistory } from 'test/factories/make-word-history'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryWordHistoryRepository: InMemoryWordHistoryRepository
let sut: FetchWordHistoryUseCase

describe('Fetch Word History', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryWordHistoryRepository = new InMemoryWordHistoryRepository()
    sut = new FetchWordHistoryUseCase(inMemoryWordHistoryRepository)
  })

  it('should be able to fetch word history', async () => {
    const user = makeUser({ name: 'Jhon Doe' })

    inMemoryUsersRepository.items.push(user)

    const wordHistory1 = makeWordHistory({ userId: user.id.toString() })
    const wordHistory2 = makeWordHistory({ userId: user.id.toString() })

    await inMemoryWordHistoryRepository.create(wordHistory1)
    await inMemoryWordHistoryRepository.create(wordHistory2)

    const result = await sut.execute({
      userId: user.id.toString(),
      page: 1,
      limit: 10,
      search: '',
    })

    if (result.isLeft()) return

    expect(result.isRight()).toBe(true)
    expect(result.value.wordHistory.data).toHaveLength(2)
    expect(result.value.wordHistory.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId: user.id.toString(),
          word: wordHistory1.word,
        }),
        expect.objectContaining({
          userId: user.id.toString(),
          word: wordHistory2.word,
        }),
      ]),
    )
  })

  it('should not be able to fetch word history if current page is greater than total pages', async () => {
    const user = makeUser({ name: 'Jhon Doe' })

    inMemoryUsersRepository.items.push(user)

    for (let i = 1; i <= 22; i++) {
      const wordHistory = makeWordHistory({ userId: user.id.toString() })
      await inMemoryWordHistoryRepository.create(wordHistory)
    }

    const result = await sut.execute({
      userId: user.id.toString(),
      page: 3,
      limit: 20,
      search: '',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able to fetch paginated word history', async () => {
    const user = makeUser({ name: 'Jhon Doe' })

    inMemoryUsersRepository.items.push(user)

    for (let i = 1; i <= 22; i++) {
      const wordHistory = makeWordHistory({
        userId: user.id.toString(),
        word: {
          id: i,
          name: `${i} word`,
        },
      })
      await inMemoryWordHistoryRepository.create(wordHistory)
    }

    const result = await sut.execute({
      userId: user.id.toString(),
      page: 2,
      limit: 20,
      search: '',
    })

    if (result.isLeft()) return

    expect(result.isRight()).toBe(true)
    expect(result.value?.wordHistory.data).toHaveLength(2)
  })

  it('should be able to fetch word history by search', async () => {
    const user = makeUser({ name: 'Jhon Doe' })

    inMemoryUsersRepository.items.push(user)

    for (let i = 1; i <= 22; i++) {
      const wordHistory = makeWordHistory({
        userId: user.id.toString(),
        word: {
          id: i,
          name: `${i} word`,
        },
      })
      await inMemoryWordHistoryRepository.create(wordHistory)
    }

    const result = await sut.execute({
      userId: user.id.toString(),
      page: 1,
      limit: 20,
      search: '0 word',
    })

    if (result.isLeft()) return

    expect(result.isRight()).toBe(true)
    expect(result.value?.wordHistory.data).toHaveLength(2)
  })

  it('should be able to fetch word history with item limit per page', async () => {
    const user = makeUser({ name: 'Jhon Doe' })

    inMemoryUsersRepository.items.push(user)

    for (let i = 1; i <= 22; i++) {
      const wordHistory = makeWordHistory({
        userId: user.id.toString(),
        word: {
          id: i,
          name: `${i} word`,
        },
      })
      await inMemoryWordHistoryRepository.create(wordHistory)
    }

    const result = await sut.execute({
      userId: user.id.toString(),
      page: 1,
      limit: 5,
      search: '',
    })

    if (result.isLeft()) return

    expect(result.isRight()).toBe(true)
    expect(result.value?.wordHistory.data).toHaveLength(5)
  })
})
