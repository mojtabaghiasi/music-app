import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlaylistEntity } from '../../playlists/entities/playlist.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({
    example: 'Jane',
    description: 'Provide the first name of the user',
  })
  @Column()
  firstName: string;
  @ApiProperty({
    example: 'Doe',
    description: 'provide the lastName of the user',
  })
  @Column()
  lastName: string;
  @ApiProperty({
    example: 'jane_doe@gmail.com',
    description: 'Provide the email of the user',
  })
  @Column()
  email: string;
  @Column({ nullable: true })
  phone: string;
  @ApiProperty({
    example: 'test123#@',
    description: 'Provide the password of the user',
  })
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
