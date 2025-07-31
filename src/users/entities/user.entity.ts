import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlaylistEntity } from '../../playlists/entities/playlist.entity';
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
  @Column({ nullable: true })
  phone: string;
  @Column()
  @Exclude()
  password: string;
  @OneToMany(() => PlaylistEntity, (playlist) => playlist.user)
  playLists: PlaylistEntity[];
  @Column({ nullable: true, type: 'text' })
  twoFASecret: string;
  @Column({ nullable: true, type: 'boolean' })
  enable2FA: boolean;
  @Column({ nullable: true, type: 'text' })
  apiKey: string;
}
