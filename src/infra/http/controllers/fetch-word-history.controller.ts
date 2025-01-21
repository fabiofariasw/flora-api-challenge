import { FetchWordHistoryUseCase } from '@/domain/dictionary/application/use-cases/fetch-word-history'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { WordHistoryPresenter } from '../presenters/word-history.presenter'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
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

@ApiTags('User')
@ApiBearerAuth()
@Controller('/user/me/history')
export class FetchWordHistoryController {
  constructor(private fetchWordHistory: FetchWordHistoryUseCase) {}

  @Get()
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiOkResponse({ description: 'Success' })
  @ApiBadRequestResponse({ description: 'Invalid value in search params' })
  async handle(
    @Query(queryParamsValidationPipe) params: QueryParamsSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const result = await this.fetchWordHistory.execute({
      userId: user.sub,
      ...params,
    })

    if (result.isLeft()) {
      throw new BadRequestException({
        message: result.value.message,
      })
    }

    const wordHistory = result.value.wordHistory

    return WordHistoryPresenter.toHTTP(wordHistory)
  }
}
