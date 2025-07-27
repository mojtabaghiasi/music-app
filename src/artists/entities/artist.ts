import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user';
import { Song } from '../../songs/entities/entity';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[];
}
