import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist';
import { In, Repository } from 'typeorm';
import { Song } from '../songs/entities/song.entity';
import { User } from '../users/entities/user.entity';
import { CreatePlayListDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist) private playListRepo: Repository<Playlist>,
    @InjectRepository(Song) private songRepo: Repository<Song>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(playListDto: CreatePlayListDto): Promise<Playlist> {
    const playlist = new Playlist();
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
