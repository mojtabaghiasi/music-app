import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity) private artistRepo: Repository<ArtistEntity>,
  ) {}

  async findArtist(userId: number): Promise<ArtistEntity | null> {
    return await this.artistRepo.findOneBy({ user: { id: userId } });
  }
}
