import { GetWordDetailsByNameUseCase } from '@/domain/dictionary/application/use-cases/get-word-details-by-name'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('Entries')
@ApiBearerAuth()
@Controller('/entries/en/:word')
export class GetWordDetailsByNameController {
  constructor(private getWordDetailsByName: GetWordDetailsByNameUseCase) {}

  @Get()
  @ApiOkResponse({ description: 'Success' })
  @ApiBadRequestResponse({ description: 'Word details not found' })
  async handle(@CurrentUser() user: UserPayload, @Param('word') word: string) {
    const result = await this.getWordDetailsByName.execute({
      userId: user.sub,
      word,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException({ message: error.message })
    }

    const wordDetails = result.value.wordDetails

    return {
      wordDetails,
    }
  }
}
