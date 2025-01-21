import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { WrongCredentialsError } from '@/domain/dictionary/application/use-cases/errors/wrong-credentials-error'
import { AuthenticateUserUseCase } from '@/domain/dictionary/application/use-cases/authenticate-user'
import { Public } from '@/infra/auth/public'
import { zodToOpenAPI } from 'nestjs-zod'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const openapi = zodToOpenAPI(authenticateBodySchema)

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@ApiTags('Auth')
@Controller('/auth/signin')
@Public()
export class AuthenticateController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}

  @Post()
  @ApiBody({ schema: openapi })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiOkResponse({
    description: 'Successful authentication',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
      },
    },
  })
  @HttpCode(200)
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateUser.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
