import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistEntity } from './entities/playlist.entity';
import { In, Repository } from 'typeorm';
import { SongEntity } from '../songs/entities/song.entity';
import { User } from '../users/entities/user.entity';
import { CreatePlayListDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(PlaylistEntity) private playListRepo: Repository<PlaylistEntity>,
    @InjectRepository(SongEntity) private songRepo: Repository<SongEntity>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(playListDto: CreatePlayListDto): Promise<PlaylistEntity> {
    const playlist = new PlaylistEntity();
    playlist.name = playListDto.name;
    playlist.songs = await this.songRepo.findBy({ id: In(playListDto.songs) });
    const user = await this.userRepo.findOneBy({ id: playListDto.user });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    playlist.user = user;
    return this.playListRepo.save(playlist);
  }
}
