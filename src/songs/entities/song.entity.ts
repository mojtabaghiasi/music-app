import { Column, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { PlaylistEntity } from '../../playlists/entities/playlist.entity';

@Entity('songs')
export class SongEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @ManyToMany(() => ArtistEntity, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: ArtistEntity[];
  @Column({ type: 'date' })
  releasedDate: Date;
  @Column({ type: 'time' })
  duration: Date;
  @Column({ type: 'text' })
  lyrics: string;
  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.songs)
  playList: PlaylistEntity;
}
