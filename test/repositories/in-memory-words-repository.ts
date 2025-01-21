export class InMemoryWordsRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public items: any[] = []

  constructor() {
    this.items = ['fire', 'firefly', 'fireplace', 'fireman']
  }

  findAll() {
    return {
      result: this.items,
      totalDocs: 20,
      page: 1,
      totalPages: 5,
      hasNext: true,
      hasPrev: false,
    }
  }
}
