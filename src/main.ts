import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
// import { ValidationPipe } from '@nestjs/common'
// import validationOptions from './utils/validation-options'
import { EnvService } from './infra/env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // app.enableCors({
  //   origin: '*',
  // })

  // app.useGlobalPipes(new ValidationPipe(validationOptions))

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  // patchNestJsSwagger()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  const configService = app.get(EnvService)
  const port = configService.get('PORT')

  await app.listen(port)
}
bootstrap()
