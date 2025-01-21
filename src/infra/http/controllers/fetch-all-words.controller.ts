import { FetchAllWordsUseCase } from '@/domain/dictionary/application/use-cases/fetch-all-words'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { WordPresenter } from '../presenters/word-presenter'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'

const queryParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
  limit: z
    .string()
    .optional()
    .default('20')
    .transform(Number)
    .pipe(z.number().min(1)),
  search: z.string().optional().default(''),
})

const queryParamsValidationPipe = new ZodValidationPipe(queryParamsSchema)

type QueryParamsSchema = z.infer<typeof queryParamsSchema>

@ApiTags('Entries')
@ApiBearerAuth()
@Controller('/entries/en')
export class FetchAllWordsController {
  constructor(private fetchAllWords: FetchAllWordsUseCase) {}

  @Get()
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiOkResponse({ description: 'Success' })
  @ApiBadRequestResponse({ description: 'Invalid value in search params' })
  async handle(@Query(queryParamsValidationPipe) params: QueryParamsSchema) {
    const result = await this.fetchAllWords.execute(params)

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const words = result.value.words

    return WordPresenter.toHTTP(words)
  }
}
