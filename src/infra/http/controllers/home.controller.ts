import { Public } from '@/infra/auth/public'
import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

@ApiTags('Home')
@Controller('/')
@Public()
export class HomeController {
  @Get()
  @ApiOkResponse({ description: 'Success' })
  handle() {
    return { message: 'English Dictionary' }
  }
}
