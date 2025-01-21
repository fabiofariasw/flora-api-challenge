import { Module } from '@nestjs/common'
import { HttpModule as AxiosHttpModule } from '@nestjs/axios'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { RegisterUserUseCase } from '@/domain/dictionary/application/use-cases/register-user'
import { AuthenticateController } from './controllers/authenticate.controller'
import { AuthenticateUserUseCase } from '@/domain/dictionary/application/use-cases/authenticate-user'
import { FetchAllWordsController } from './controllers/fetch-all-words.controller'
import { FetchAllWordsUseCase } from '@/domain/dictionary/application/use-cases/fetch-all-words'
import { GetWordDetailsByNameController } from './controllers/get-word-details-by-name.controller'
import { GetWordDetailsByNameUseCase } from '@/domain/dictionary/application/use-cases/get-word-details-by-name'
import { DictionaryApiService } from './external/dictionary-api.service'
import { FetchFavoriteWordsController } from './controllers/fetch-favorite-words.controller'
import { FetchFavoriteWordsUseCase } from '@/domain/dictionary/application/use-cases/fetch-favorite-words'
import { GetUserDetailsController } from './controllers/get-user-details.controller'
import { GetUserDetailsUseCase } from '@/domain/dictionary/application/use-cases/get-user-details'
import { FetchWordHistoryController } from './controllers/fetch-word-history.controller'
import { FetchWordHistoryUseCase } from '@/domain/dictionary/application/use-cases/fetch-word-history'
import { FavoriteWordController } from './controllers/favorite-word.controller'
import { FavoriteWordUseCase } from '@/domain/dictionary/application/use-cases/favorite-word'
import { UnfavoriteWordController } from './controllers/unfavorite-word.controller'
import { UnfavoriteWordUseCase } from '@/domain/dictionary/application/use-cases/unfavorite-word'
import { HomeController } from './controllers/home.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, AxiosHttpModule],
  controllers: [
    HomeController,
    CreateAccountController,
    AuthenticateController,
    FetchAllWordsController,
    GetWordDetailsByNameController,
    GetUserDetailsController,
    FetchWordHistoryController,
    FetchFavoriteWordsController,
    FavoriteWordController,
    UnfavoriteWordController,
  ],
  providers: [
    DictionaryApiService,
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    FetchAllWordsUseCase,
    GetWordDetailsByNameUseCase,
    FetchFavoriteWordsUseCase,
    GetUserDetailsUseCase,
    FetchWordHistoryUseCase,
    FavoriteWordUseCase,
    UnfavoriteWordUseCase,
  ],
})
export class HttpModule {}
