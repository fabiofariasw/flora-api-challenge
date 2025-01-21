import { FetchFavoriteWordsUseCase } from '@/domain/dictionary/application/use-cases/fetch-favorite-words'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { FavoriteWordPresenter } from '../presenters/favorite-word-presenter'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { z } from 'zod'
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
@Controller('/user/me/favorites')
export class FetchFavoriteWordsController {
  constructor(private fetchFavoriteWords: FetchFavoriteWordsUseCase) {}

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
    const result = await this.fetchFavoriteWords.execute({
      userId: user.sub,
      ...params,
    })

    if (result.isLeft()) {
      throw new BadRequestException({
        message: result.value.message,
      })
    }

    const favoriteWords = result.value.favoriteWords

    return FavoriteWordPresenter.toHTTP(favoriteWords)
  }
}
