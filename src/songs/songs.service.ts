import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { Connection } from 'src/common/constants/connection';
import { SongEntity } from './entities/song.entity';
import { In, Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song-dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { ArtistEntity } from '../artists/entities/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @Inject('CONNECTION') connection: Connection,
    @InjectRepository(SongEntity)
    private songRepository: Repository<SongEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {
    log('connection string', connection.CONNECTION_STRING);
  }

  private readonly songs: any = [];

  async create(songDto: CreateSongDto): Promise<SongEntity> {
    const song = new SongEntity();
    song.title = songDto.title;
    song.artists = songDto.artists;
    song.duration = songDto.duration;
    song.lyrics = songDto.lyrics;
    song.releasedDate = songDto.releasedDate;

    song.artists = await this.artistRepository.findBy({
      id: In(songDto.artists),
    });
    return await this.songRepository.save(song);
  }

  async findAll(): Promise<SongEntity[]> {
    return await this.songRepository.find();
  }

  async findOne(id: number): Promise<SongEntity | null> {
    return await this.songRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.songRepository.delete({ id });
  }

  async update(
    id: number,
    recordToUpdate: UpdateSongDto,
  ): Promise<UpdateResult> {
    return await this.songRepository.update(id, recordToUpdate);
  }

  async paginateSongs(
    options: IPaginationOptions,
  ): Promise<Pagination<SongEntity>> {
    const queryBuilder = this.songRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');
    return paginate<SongEntity>(queryBuilder, options);
  }
}
