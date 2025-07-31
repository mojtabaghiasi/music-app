import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { SongEntity } from '../../songs/entities/song.entity';

@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  @ManyToMany(() => SongEntity, (song) => song.artists)
  songs: SongEntity[];
}
