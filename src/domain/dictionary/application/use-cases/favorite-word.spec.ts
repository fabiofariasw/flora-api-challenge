import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryFavoriteWordsRepository } from 'test/repositories/in-memory-favorite-words-repository'
import { FavoriteWordUseCase } from './favorite-word'
import { InMemoryWordsRepository } from 'test/repositories/in-memory-words-repository'
import { Word } from '../../enterprise/entities/word'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { FavoriteWord } from '../../enterprise/entities/favorite-word'
import { FavoriteAlreadyExistsError } from './errors/favorite-already-exists-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryWordsRepository: InMemoryWordsRepository
let inMemoryFavoriteWordsRepository: InMemoryFavoriteWordsRepository
let sut: FavoriteWordUseCase

describe('Favorite Word', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryWordsRepository = new InMemoryWordsRepository()
    inMemoryFavoriteWordsRepository = new InMemoryFavoriteWordsRepository()
    sut = new FavoriteWordUseCase(
      inMemoryWordsRepository,
      inMemoryFavoriteWordsRepository,
    )
  })

  it('should be able to favorite a word', async () => {
    const user = makeUser({ name: 'John Doe' })

    inMemoryUsersRepository.items.push(user)

    const word = Word.create({
      id: 1,
      name: 'test',
    })

    inMemoryWordsRepository.create(word)

    const result = await sut.execute({
      userId: user.id.toString(),
      word: word.name,
    })

    if (result.isLeft()) return

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      favoriteWord: inMemoryFavoriteWordsRepository.items[0],
    })
  })

  it('should not be able to favorite a word that does not exist', async () => {
    const user = makeUser({ name: 'John Doe' })

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      word: 'test',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to favorite a word that is already favorited', async () => {
    const user = makeUser({ name: 'John Doe' })

    inMemoryUsersRepository.items.push(user)

    const word = Word.create({
      id: 1,
      name: 'test',
    })

    inMemoryWordsRepository.create(word)

    const favoriteWord = FavoriteWord.create({
      userId: user.id.toString(),
      word: {
        id: word.id,
        name: word.name,
      },
    })

    inMemoryFavoriteWordsRepository.create(favoriteWord)

    const result = await sut.execute({
      userId: user.id.toString(),
      word: word.name,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(FavoriteAlreadyExistsError)
  })
})
