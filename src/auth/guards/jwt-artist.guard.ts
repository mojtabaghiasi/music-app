import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtPayloadType } from '../types/jwt.payload.type';

export class JwtArtistGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser = JwtPayloadType>(err: any, user: JwtPayloadType): TUser {
    if (err || !user) {
      throw err || new Error('User not found');
    }
    if (user.artistId) {
      return user as TUser;
    }
    throw err || new UnauthorizedException('User is not an artist');
  }
}
