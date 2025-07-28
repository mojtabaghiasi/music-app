import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlayListDto } from './dto/create-playlist.dto';
import { PlaylistEntity } from './entities/playlist.entity';

@Controller('playlists')
export class PlaylistsController {
  constructor(private playListService: PlaylistsService) {}

  @Post()
  create(@Body() playListDto: CreatePlayListDto): Promise<PlaylistEntity> {
    return this.playListService.create(playListDto);
  }
}
