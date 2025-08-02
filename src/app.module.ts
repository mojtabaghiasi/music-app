import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { devConfig, proConfig } from './common/constants/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PlaylistsModule } from './playlists/playlists.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ArtistsModule } from './artists/artists.module';
import { typeOrmAsyncConfig } from '../db/data-source';
import { SeedModule } from './seed/seed.module';
import configuration from './config/configuration';
import { validate } from '../env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate,
      isGlobal: true,
      envFilePath: [`{process.cwd()}/.${process.env.NODE_ENV}.env`],
      load: [configuration],
    }),
    SongsModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    PlaylistsModule,
    UsersModule,
    AuthModule,
    ArtistsModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'CONFIG',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<string>('NODE_ENV') === 'development'
          ? devConfig
          : proConfig;
      },
    },
  ],
})
export class AppModule {
  constructor() {}
}
