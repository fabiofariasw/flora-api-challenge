import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { WordDetails } from '@/domain/dictionary/enterprise/entities/value-objects/word-details'

@Injectable()
export class DictionaryApiService {
  constructor(private httpService: HttpService) {}

  async getWordDetails(word: string): Promise<WordDetails> {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    const response = await firstValueFrom(this.httpService.get(url))

    return response.data
  }
}
