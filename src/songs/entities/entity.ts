import { Column, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artists/entities/artist';
import { Playlist } from '../../playlists/entities/playlist';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];
  @Column({ type: 'date' })
  releasedDate: Date;
  @Column({ type: 'time' })
  duration: Date;
  @Column({ type: 'text' })
  lyrics: string;
  @ManyToOne(() => Playlist, (playlist) => playlist.songs)
  playList: Playlist;
}
