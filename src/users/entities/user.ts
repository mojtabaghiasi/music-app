import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Playlist } from '../../playlists/entities/playlist';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column()
  @Exclude()
  password: string;
  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playLists: Playlist[];
}
