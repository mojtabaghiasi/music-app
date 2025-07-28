import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as speakeasy from 'speakeasy';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType } from './types/jwt.payload.type';
import { ArtistsService } from '../artists/artists.service';
import { Enable2FAType } from './types/enable-2FA.type';
import { UpdateResult } from 'typeorm';

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

  async enable2FA(userId: number): Promise<Enable2FAType> {
    const user = await this.userService.findOne({ id: userId });
    if (user.enable2FA) {
      return {
        secret: user.twoFASecret,
      };
    }
    const secret = speakeasy.generateSecret();
    console.log(secret);
    user.twoFASecret = secret.base32;
    await this.userService.updateSecretKey(user.id, user.twoFASecret);
    return { secret: user.twoFASecret };
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userService.update(userId, {
      twoFASecret: undefined,
      enable2FA: true,
    });
  }
}
