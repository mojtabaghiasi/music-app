import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from './entities/song.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SongEntity, ArtistEntity])],
  controllers: [SongsController],
  providers: [
    SongsService,
    // Non class based providers
    // You can use it to add constant values
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongsModule {}
