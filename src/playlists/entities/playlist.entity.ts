import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SongEntity } from '../../songs/entities/song.entity';
import { User } from '../../users/entities/user.entity';

@Entity('playlist')
export class PlaylistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => SongEntity, (song) => song.playList)
  songs: SongEntity[];

  @ManyToOne(() => User, (user) => user.playLists)
  user: User;
}
