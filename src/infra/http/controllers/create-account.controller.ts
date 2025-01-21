import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { RegisterUserUseCase } from '@/domain/dictionary/application/use-cases/register-user'
import { UserAlreadyExistsError } from '@/domain/dictionary/application/use-cases/errors/user-already-exists-error'
import { Public } from '@/infra/auth/public'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger'
import { zodToOpenAPI } from 'nestjs-zod'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

const openapi = zodToOpenAPI(createAccountBodySchema)

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@ApiTags('Auth')
@Controller('/auth/signup')
@Public()
export class CreateAccountController {
  constructor(private registerUser: RegisterUserUseCase) {}

  @Post()
  @ApiBody({ schema: openapi })
  @ApiCreatedResponse({ description: 'Account created' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiConflictResponse({ description: 'User already exists' })
  @HttpCode(201)
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const result = await this.registerUser.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException({ message: error.message })
        default:
          throw new BadRequestException({ message: error.message })
      }
    }
  }
}
