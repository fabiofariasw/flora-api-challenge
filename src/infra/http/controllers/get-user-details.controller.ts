import { GetUserDetailsUseCase } from '@/domain/dictionary/application/use-cases/get-user-details'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { BadRequestException, Controller, Get } from '@nestjs/common'
import { UserDetailsPresenter } from '../presenters/user-details-presenter'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('User')
@ApiBearerAuth()
@Controller('/user/me')
export class GetUserDetailsController {
  constructor(private getUserDetails: GetUserDetailsUseCase) {}

  @Get()
  @ApiOkResponse({ description: 'Success' })
  @ApiBadRequestResponse({ description: 'User not found' })
  async handle(@CurrentUser() user: UserPayload) {
    const result = await this.getUserDetails.execute({ userId: user.sub })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const userDetails = result.value.userDetails

    return UserDetailsPresenter.toHTTP(userDetails)
  }
}
