import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Song } from '../../songs/entities/song.entity';

@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[];
}
