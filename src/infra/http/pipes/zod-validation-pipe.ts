import { PipeTransform, BadRequestException } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(this.generateErrorMessage(error))
      }

      throw new BadRequestException('Validation failed')
    }
  }

  generateErrorMessage(error: ZodError) {
    if (error.issues.length === 1) {
      return {
        message: `The parameter '${error.issues[0].path}' ${error.issues[0].message.toLowerCase()}`,
      }
    }

    return {
      message: error.issues.map(
        (issue) =>
          `The parameter '${issue.path}' ${issue.message.toLowerCase()}`,
      ),
    }
  }
}
