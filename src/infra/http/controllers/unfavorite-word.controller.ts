import { UnfavoriteWordUseCase } from '@/domain/dictionary/application/use-cases/unfavorite-word'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('Entries')
@ApiBearerAuth()
@Controller('/entries/en/:word/unfavorite')
export class UnfavoriteWordController {
  constructor(private unfavoriteWord: UnfavoriteWordUseCase) {}

  @Delete()
  @ApiNoContentResponse({ description: 'Success' })
  @ApiBadRequestResponse({ description: 'Word not found or not favorited' })
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPayload, @Param('word') word: string) {
    const result = await this.unfavoriteWord.execute({
      userId: user.sub,
      word,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
