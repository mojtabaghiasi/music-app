import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType } from './types/jwt.payload.type';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private artistService: ArtistsService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(loginDto);
    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Username or password is not correct');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user;
    const payload: JwtPayloadType = {
      email: safeUser.email,
      userId: safeUser.id,
    };
    const artistId = await this.artistService.findArtist(safeUser.id);
    if (artistId) {
      payload.artistId = artistId.id;
    }
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
