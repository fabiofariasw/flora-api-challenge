import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { FavoriteWordUseCase } from '@/domain/dictionary/application/use-cases/favorite-word'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('Entries')
@ApiBearerAuth()
@Controller('/entries/en/:word/favorite')
export class FavoriteWordController {
  constructor(private favoriteWord: FavoriteWordUseCase) {}

  @Post()
  @ApiNoContentResponse({ description: 'Success' })
  @ApiBadRequestResponse({ description: 'Word not found' })
  @ApiConflictResponse({ description: 'Word already favorited' })
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPayload, @Param('word') word: string) {
    const result = await this.favoriteWord.execute({
      userId: user.sub,
      word,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new BadRequestException({ message: error.message })
        default:
          throw new ConflictException({ message: result.value.message })
      }
    }
  }
}
