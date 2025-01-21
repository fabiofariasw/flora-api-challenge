import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { HttpModule } from './infra/http/http.module'
import { EnvModule } from './infra/env/env.module'
import { AuthModule } from './infra/auth/auth.module'
import { envSchema } from './infra/env/env'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    EnvModule,
    // SharedModule,
    // WordModule,
    // UserModule,
  ],
})
export class AppModule {}
